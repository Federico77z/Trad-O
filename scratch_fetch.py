import urllib.request
import urllib.parse
import json
import xml.etree.ElementTree as ET
import time
import re

def search_ncbi(query, db="protein"):
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db={db}&term={urllib.parse.quote(query)}&retmode=json&retmax=20"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data.get("esearchresult", {}).get("idlist", [])
    except Exception as e:
        print(f"Search error for query '{query}': {e}")
        return []

def fetch_protein_details(id_list):
    if not id_list:
        return None
    ids = ",".join(id_list)
    # Fetch docsum for names and organisms
    summary_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=protein&id={ids}&retmode=json"
    # Fetch fasta for sequences
    fasta_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=protein&id={ids}&rettype=fasta&retmode=text"
    
    try:
        # Get metadata
        req = urllib.request.Request(summary_url, headers={'User-Agent': 'Mozilla/5.0'})
        metadata = {}
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            results = res_data.get("result", {})
            for uid in results.get("uids", []):
                doc = results.get(uid, {})
                title = doc.get("title", "Unknown Protein")
                # Clean title: e.g. "small ribosomal subunit protein S20 [Escherichia coli]" -> "small ribosomal subunit protein S20"
                title = re.sub(r'\s*\[[^\]]+\]\s*$', '', title)
                metadata[uid] = {
                    "name": title,
                    "organism": doc.get("organism", "Unknown organism"),
                    "accession": doc.get("accessionversion", uid)
                }
        
        # Get sequences
        req_fasta = urllib.request.Request(fasta_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_fasta) as response:
            fasta_text = response.read().decode('utf-8')
            
        # Parse FASTA
        records = fasta_text.strip().split(">")
        parsed_records = []
        for rec in records:
            if not rec.strip():
                continue
            lines = rec.strip().split("\n")
            header = lines[0]
            sequence = "".join(lines[1:]).strip()
            
            # Find which ID matches this header
            # Header format: "gi|...|ref|NP_001001|..." or "NP_001001.1 small ribosomal..."
            matching_info = None
            for uid, info in metadata.items():
                acc = info["accession"].split(".")[0]
                if acc in header or uid in header:
                    matching_info = info
                    break
            
            if matching_info and sequence:
                parsed_records.append({
                    "name": matching_info["name"],
                    "organism": matching_info["organism"],
                    "accession": matching_info["accession"],
                    "sequence": sequence,
                    "length": len(sequence)
                })
        
        return parsed_records
    except Exception as e:
        print(f"Fetch error: {e}")
        return None

def main():
    proteins = []
    # Fetch 20 proteins of increasing lengths from 100 to 119
    for length in range(100, 120):
        print(f"Searching for protein of length {length}...")
        # Search for reviewed/RefSeq proteins of exact length to ensure high quality titles and sequences
        query = f'({length}[SLEN]) AND "srcdb_refseq"[Properties] AND "reviewed"[Filter] AND "Homo sapiens"[Organism]'
        ids = search_ncbi(query)
        
        # If human has none, search for any eukaryotic reviewed protein of that length
        if not ids:
            query = f'({length}[SLEN]) AND "srcdb_refseq"[Properties] AND "reviewed"[Filter] AND "eukaryotes"[Organism]'
            ids = search_ncbi(query)
            
        # If still none, search any RefSeq protein of that length
        if not ids:
            query = f'({length}[SLEN]) AND "srcdb_refseq"[Properties]'
            ids = search_ncbi(query)
            
        if ids:
            # Fetch details for the first 2 candidates to choose the best one
            details = fetch_protein_details(ids[:3])
            if details:
                # Find one with a clean sequence (only 20 standard amino acids, no 'X', 'B', 'Z' or 'U')
                valid_detail = None
                for d in details:
                    seq = d["sequence"].upper()
                    if len(seq) == length and not any(char in seq for char in ['X', 'B', 'Z', 'U', '*']):
                        valid_detail = d
                        break
                if valid_detail:
                    proteins.append(valid_detail)
                    print(f"Added: {valid_detail['name']} ({valid_detail['organism']}) - Length: {length}")
                else:
                    # Fallback to first one
                    proteins.append(details[0])
                    print(f"Added (fallback): {details[0]['name']} ({details[0]['organism']}) - Length: {length}")
            else:
                print(f"Failed to fetch details for length {length}")
        else:
            print(f"No proteins found for length {length}")
        
        # Respect rate limit
        time.sleep(0.5)
    
    # Save to file
    with open("proteins.json", "w") as f:
        json.dump(proteins, f, indent=4)
    print("Done! Saved 20 proteins to proteins.json")

if __name__ == "__main__":
    main()
