// Trad-O: The Protein Translation Game Prototype
// Core Game Logic & Rendering - Real Protein Out-of-Order Version

// 1. EMBEDDED REAL PROTEINS LIST (NCBI GenPept/RefSeq reviewed, lengths 100-119)
const PROTEINS_LIST = [
    {
        "name": "defensin-6 preproprotein",
        "organism": "Homo sapiens",
        "accession": "NP_001917.1",
        "sequence": "MRTLTILTAVLLVALQAKAEPLQAEDDPLQAKAYEADAQEQRGANDQDFAVSFAEDASSSLRALGSTRAFTCHCRRSCYSTEYSYGTCTVMGINHRFCCL",
        "length": 100
    },
    {
        "name": "pancreatic polypeptide prohormone isoform 2 precursor",
        "organism": "Homo sapiens",
        "accession": "NP_001306138.1",
        "sequence": "MCDCDLMAAARLCLSLLLLSTCVALLLQPLLGAQGAPLEPVYPGDNATPEQMAQYAADLRRYINMLTRPRYGKRHKEDTLAFSEWGSPHAAVPRELSPLDL",
        "length": 101
    },
    {
        "name": "TYRO protein tyrosine kinase-binding protein isoform 3 precursor",
        "organism": "Homo sapiens",
        "accession": "NP_001166985.1",
        "sequence": "MGGLEPCSRLLLLPLLLAVSDCSCSTVSPGVLAGIVMGDLVLTVLIALAVYFLGRLVPRGRGAAEAATRKQRITETESPYQELQGQRSDVYSDLNTQRPYYK",
        "length": 102
    },
    {
        "name": "matrix Gla protein isoform 2 preproprotein",
        "organism": "Homo sapiens",
        "accession": "NP_000891.2",
        "sequence": "MKSLILLAILAALAVVTLCYESHESMESYELNPFINRRNANTFISPQQRWRAKVQERIRERSKPVHELNREACDDYRLCERYAMVYGYNAAYNRYFRKRRGTK",
        "length": 103
    },
    {
        "name": "transmembrane protein 138 isoform 2",
        "organism": "Homo sapiens",
        "accession": "NP_001317210.1",
        "sequence": "MFFNTFVFQAGLVNLLFHKFKGTIILTAVYFALSISLHVWVMNLRWKNSNSFIWTDGLQMLFVFQRLAAVLYCYFYKRTAVRLGDPHFYQDSLWLRKEFMQVRR",
        "length": 104
    },
    {
        "name": "CKLF-like MARVEL transmembrane domain-containing protein 5 isoform d",
        "organism": "Homo sapiens",
        "accession": "NP_001275673.1",
        "sequence": "MLSARDRRDRHPEEGVVAELQGFAVDKAFLTSHKGILLETELDFLRCVSAIIIFLVVSFAAVTSRDGAAIAAFVFGIILVSIFAYDAFKIYRTEMAPGASQGDQQ",
        "length": 105
    },
    {
        "name": "cyclic AMP-dependent transcription factor ATF-3 isoform 5",
        "organism": "Homo sapiens",
        "accession": "NP_001193415.1",
        "sequence": "MMLQHPGQVSASEEELRFAIQNKHLCHRMSSALESVTVSDRPLGVSITKAEVAPEEDERKKRRRERNKIAAAKCRNKKKEKTECLQKLPRPFWVQKTCIWAVDSCK",
        "length": 106
    },
    {
        "name": "TIM double twin CX3C motif protein isoform 4",
        "organism": "Homo sapiens",
        "accession": "NP_001316686.1",
        "sequence": "MFRCSASCCEDSQASMKQVHQCIERCHVPLAQAQALVTSELEKFQDRLARCTMHCNDKAKDSIDAGSKELQVKQQLDSCVTKCVDDHMHLIPTMTKKMKEALLSIGK",
        "length": 107
    },
    {
        "name": "trafficking protein particle complex subunit 2-like protein isoform 9",
        "organism": "Homo sapiens",
        "accession": "NP_001305461.1",
        "sequence": "MGISCDSRLPHFSKVRAHRGPSTGSPCVTSAFPNQLCRYGYVTNSKVKFVMVVDSSNTALRDNEIRSMFRKLHNSYTDVMCNPFYNPGDRIQSRAFDNMVTSMMIQVC",
        "length": 108
    },
    {
        "name": "microfibrillar-associated protein 5 isoform e precursor",
        "organism": "Homo sapiens",
        "accession": "NP_001284641.1",
        "sequence": "MSLLGPKVLLFLAAFIITSDWIPLGVNSQRGDDVTQATPETFTEDPNLVNDPATDETVLAVLADIAPSTDDLDELCRQMAGLPPRRLRRSNYFRLPPCENVDLQRPNGL",
        "length": 109
    },
    {
        "name": "trafficking protein particle complex subunit 2-like protein isoform 6",
        "organism": "Homo sapiens",
        "accession": "NP_001305457.1",
        "sequence": "MVHTSLDVVDEKISAMGKALVDQRELYLGLLYPTEDYKVYGYVTNSKVKFVMVVDSSNTALRDNEIRSMFRKLHNSYTDVMCNPFYNPGDRIQSSRAFDNMVTSMMIQVC",
        "length": 110
    },
    {
        "name": "coiled-coil and C2 domain-containing protein 2A isoform c",
        "organism": "Homo sapiens",
        "accession": "NP_001158192.1",
        "sequence": "MNPREEKVKIITEEFIENDEDADMGRQNKNSKVRRQPRKKQPPTAVPKEMVSEKSHLGNPQEPVQEEPKTRLLSMTVRRGPRRELVVKKSLGRPGTVTHVCNPSTLEGRGG",
        "length": 111
    },
    {
        "name": "serine-protein kinase ATM isoform b",
        "organism": "Homo sapiens",
        "accession": "NP_001338764.1",
        "sequence": "MSLVLNDLLICCRQLEHDRATERKKEVEKFKRLIRDPETIKHLDRHSDSKQGKYLNWDAVFRFLQKYIQKETECLRIAKPNVSASTQASRQKKMQEISSLVKYFIKCANRSK",
        "length": 112
    },
    {
        "name": "ubiquitin-conjugating enzyme E2 H isoform 3",
        "organism": "Homo sapiens",
        "accession": "NP_001189427.1",
        "sequence": "MNKIFHPNIDEASGTVCLDVINQTWTALYDLTNIFESFLPQLLAYPNPIDPLNGDAAAMYLHRPEEYKQKIKEYIQKYATEEALKEQEEGTGDSSSESSMSDFSEDEAQDMEL",
        "length": 113
    },
    {
        "name": "NTF2-related export protein 2 isoform 3",
        "organism": "Homo sapiens",
        "accession": "NP_001229547.1",
        "sequence": "MDKRRRALTRLYLDKATLIWNGNAVSGLDALNNFFDTLPSSEFQVNMLDCQPVHEQATQSQTTVLVVTSGTVKFDGNKQHFFNQNFLLTAQSTPNNTVWKIASDCFRFQDWSSS",
        "length": 114
    },
    {
        "name": "trafficking protein particle complex subunit 2-like protein isoform 5",
        "organism": "Homo sapiens",
        "accession": "NP_001305456.1",
        "sequence": "MGISCDSRLPHFSKVRAHRGPSTGSPCVTSAFPNQLCRYGYVTNSKVKFVMVVDSSNTALRDNEIRSMFRKLHNSYTDVMCNPFYNPGDRIQSSGSVSLSRAFDNMVTSMMIQVC",
        "length": 115
    },
    {
        "name": "glycoprotein hormones alpha chain isoform 2 precursor",
        "organism": "Homo sapiens",
        "accession": "NP_000726.1",
        "sequence": "MDYYRKYAAIFLVTLSVFLHVLHSAPDVQDCPECTLQENPFFSQPGAPILQCMGCCFSRAYPTPLRSKKTMLVQKNVTSESTCCVAKSYNRVTVMGGFKVENHTACHCSTCYYHKS",
        "length": 116
    },
    {
        "name": "phosphomevalonate kinase isoform 4",
        "organism": "Homo sapiens",
        "accession": "NP_001335625.1",
        "sequence": "MSVLSSGSLVHSRNSMLRKIVEGISQPIWLVSDTRRVSDIQWFREAYGAVTQTVRVVALEQSRQQRGWVFTPGVDDAESECGLDNFGDFDWVIENHGVEQRLEEQLENLIEFIRSRL",
        "length": 117
    },
    {
        "name": "cyclin-dependent kinase 2-interacting protein isoform 2",
        "organism": "Homo sapiens",
        "accession": "NP_001306975.1",
        "sequence": "MEAKTLGTVTPRKPVLSVSARKIKDNAADWHNLILKWETLNDAGFTTANNIANLKISLLNKDKIELDSSSPASKENEEKVCLEYNEELEKLCEELQATLDGLMRFRISSWRCTGRSCS",
        "length": 118
    },
    {
        "name": "TRAF family member-associated NF-kappa-B activator isoform b",
        "organism": "Homo sapiens",
        "accession": "NP_597841.1",
        "sequence": "MDKNIGEQLNKAYEAFRQACMDRDSAVKELQQKTENYEQRIREQQEQLSLQQTIIDKLKSQLLLVNSTQDNNYGCVPLLEDSETRKNNLTLDQPQDKVISGIAREKLPKVDIASAESSI",
        "length": 119
    }
];

// 2. BIOCHEMICAL GENETIC CODE DEFINITION
const aminoAcidMap = {
    'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
    'UAU': 'Tyr', 'UAC': 'Tyr',
    'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
    'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
    'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
    'UGU': 'Cys', 'UGC': 'Cys', 'UGG': 'Trp',
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
    'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
};

const ONE_TO_THREE = {
    'A': 'Ala', 'R': 'Arg', 'N': 'Asn', 'D': 'Asp', 'C': 'Cys',
    'E': 'Glu', 'Q': 'Gln', 'G': 'Gly', 'H': 'His', 'I': 'Ile',
    'L': 'Leu', 'K': 'Lys', 'M': 'Met', 'F': 'Phe', 'P': 'Pro',
    'S': 'Ser', 'T': 'Thr', 'W': 'Trp', 'Y': 'Tyr', 'V': 'Val'
};

const THREE_TO_ONE = {
    'Ala': 'A', 'Arg': 'R', 'Asn': 'N', 'Asp': 'D', 'Cys': 'C',
    'Glu': 'E', 'Gln': 'Q', 'Gly': 'G', 'His': 'H', 'Ile': 'I',
    'Leu': 'L', 'Lys': 'K', 'Met': 'M', 'Phe': 'F', 'Pro': 'P',
    'Ser': 'S', 'Thr': 'T', 'Trp': 'W', 'Tyr': 'Y', 'Val': 'V'
};

const aminoAcidsList = [
    'Met', 'Phe', 'Val', 'Pro', 'Lys', 'Asp', 'Ser', 'Leu', 'Ile', 
    'Thr', 'Ala', 'Tyr', 'His', 'Gln', 'Asn', 'Glu', 'Cys', 'Trp', 'Arg', 'Gly'
];

// Generate HSL colors for each amino acid
const AA_DETAILS = {};
aminoAcidsList.forEach((aa, index) => {
    const hue = (index * 18) % 360;
    AA_DETAILS[aa] = {
        color: `hsl(${hue}, 100%, 60%)`,
        aaClass: `aa-${aa.toLowerCase()}`
    };
});

// Group codons by amino acid
const AA_TO_CODONS = {};
Object.entries(aminoAcidMap).forEach(([codon, aa]) => {
    if (!AA_TO_CODONS[aa]) AA_TO_CODONS[aa] = [];
    AA_TO_CODONS[aa].push(codon);
});

const BASE_PAIRS = { 'A': 'U', 'U': 'A', 'G': 'C', 'C': 'G' };

function getComplementaryBase(base) {
    return BASE_PAIRS[base] || '';
}

function getComplementaryCodon(codon) {
    if (!codon || typeof codon !== 'string') return '???';
    return codon.split('').map(getComplementaryBase).join('');
}

function getCodonInfo(codon) {
    if (!codon || typeof codon !== 'string') {
        return {
            aminoAcid: '???',
            anticodon: '???',
            color: '#ffffff',
            aaClass: 'aa-generic'
        };
    }
    const aminoAcid = aminoAcidMap[codon] || '???';
    const anticodon = getComplementaryCodon(codon);
    const details = AA_DETAILS[aminoAcid] || { color: '#ffffff', aaClass: 'aa-generic' };
    return {
        aminoAcid: aminoAcid,
        anticodon: anticodon,
        color: details.color,
        aaClass: details.aaClass
    };
}

function formatCodonHTML(codon) {
    if (!codon || typeof codon !== 'string') return '-';
    return codon.split('').map(base => `<span class="base-${base.toLowerCase()}">${base}</span>`).join('');
}

function formatAminoAcidHTML(aminoAcid) {
    const details = AA_DETAILS[aminoAcid] || { color: '#ffffff' };
    const color = details.color;
    return `<span class="aa-tag" style="background: ${color}40; border: 1px solid ${color};">${aminoAcid}</span>`;
}

// 3. SOUND SYNTHESIZER
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.bgmMuted = false;
        this.bgmPlaying = false;
        this.bgmIntervalId = null;
        this.currentBeat = 0;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    startBGM() {
        this.init();
        if (this.bgmIntervalId) return;
        
        this.bgmPlaying = true;
        this.currentBeat = 0;
        
        // Minor key arpeggios: Am -> G -> F -> E
        const A2 = 110.00, C3 = 130.81, E3 = 164.81, A3 = 220.00;
        const G2 = 98.00, B2 = 123.47, D3 = 146.83, G3 = 196.00;
        const F2 = 87.31, A2_ = 110.00, C3_ = 130.81, F3 = 174.61;
        const E2 = 82.41, G2_ = 98.00, B2_ = 123.47, E3_ = 164.81;
        
        const BASS_LINE = [
            A2, E3, A3, E3, A2, E3, A3, E3,
            G2, D3, G3, D3, G2, D3, G3, D3,
            F2, C3, F3, C3, F2, C3, F3, C3,
            E2, B2, E3, B2, E2, B2, E3, B2
        ];
        
        // Mix between Korobeiniki (Tetris) and repetitive hypnotic theme
        const MELODY_LINE = [
            659.25, 493.88, 523.25, 587.33, 523.25, 493.88, 440.00, null,
            523.25, 659.25, 587.33, 523.25, 493.88, null, 523.25, 587.33,
            659.25, 523.25, 440.00, 440.00, null, 587.33, 698.46, 880.00,
            783.99, 698.46, 659.25, null, 523.25, 659.25, 587.33, 523.25
        ];
        
        this.bgmIntervalId = setInterval(() => {
            if (gameState === 'PAUSED') return; // Silence BGM on system pause
            if (this.muted || this.bgmMuted || !this.ctx) return;
            
            const now = this.ctx.currentTime;
            
            // 1. Triangle Melody Note
            const melodyFreq = MELODY_LINE[this.currentBeat % MELODY_LINE.length];
            if (melodyFreq !== null && melodyFreq !== undefined) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                const freqToPlay = (typeof isOverdrive !== 'undefined' && isOverdrive) ? melodyFreq * 1.5 : melodyFreq;
                osc.frequency.setValueAtTime(freqToPlay, now);
                
                gain.gain.setValueAtTime(0.015, now); // Extremely gentle melody volume
                gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.18);
            }
            
            // 2. Sine Wave Bass Note
            const bassFreq = BASS_LINE[this.currentBeat % BASS_LINE.length];
            if (bassFreq !== null && bassFreq !== undefined) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(bassFreq, now);
                
                gain.gain.setValueAtTime(0.035, now); // Warm soft bass volume
                gain.gain.linearRampToValueAtTime(0.001, now + 0.19);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.19);
            }
            
            this.currentBeat++;
        }, 200);
    }
    
    stopBGM() {
        if (this.bgmIntervalId) {
            clearInterval(this.bgmIntervalId);
            this.bgmIntervalId = null;
        }
        this.bgmPlaying = false;
    }

    playSpawn() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playMatch() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + index * 0.03);
            
            gain.gain.setValueAtTime(0.06, now + index * 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + index * 0.05);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.03);
            osc.stop(now + 0.5 + index * 0.05);
        });
    }

    playMismatch() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.35);
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    playLevelUp() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [440, 554, 659, 880, 1109];
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + index * 0.08);
            
            gain.gain.setValueAtTime(0.08, now + index * 0.08);
            gain.gain.linearRampToValueAtTime(0.001, now + index * 0.08 + 0.25);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.08);
            osc.stop(now + index * 0.08 + 0.25);
        });
    }

    playGameOver() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [311.13, 277.18, 246.94, 207.65];
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + index * 0.15);
            osc.frequency.linearRampToValueAtTime(freq - 30, now + index * 0.15 + 0.4);
            
            gain.gain.setValueAtTime(0.1, now + index * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.45);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.15);
            osc.stop(now + index * 0.15 + 0.5);
        });
    }

    playPerfect() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const freqs = [659.25, 880.00, 1046.50, 1318.51, 1760.00];
        freqs.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + index * 0.028);
            gain.gain.setValueAtTime(0.08, now + index * 0.028);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45 + index * 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.028);
            osc.stop(now + 0.5 + index * 0.04);
        });
    }

    playOverdrive() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + index * 0.045);
            gain.gain.setValueAtTime(0.06, now + index * 0.045);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.045 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.045);
            osc.stop(now + index * 0.045 + 0.38);
        });
    }

    playPowerup(type) {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const freqs = type === 'GOLD'
            ? [587.33, 880, 1174.66, 1760]
            : type === 'FREEZE'
                ? [1046.50, 783.99, 659.25, 523.25]
                : [523.25, 659.25, 1046.50];
        freqs.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.04);
            gain.gain.setValueAtTime(0.07, now + i * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.04);
            osc.stop(now + i * 0.04 + 0.32);
        });
    }

    playHazard() {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        [145, 98].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            osc.frequency.linearRampToValueAtTime(48, now + idx * 0.08 + 0.35);
            gain.gain.setValueAtTime(0.13, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.36);
        });
    }

    playVirusHit(type) {
        if (this.muted || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = type === 'RED'
            ? [220, 155.56, 110]
            : type === 'YELLOW'
                ? [330, 440, 261.63]
                : [246.94, 185.00];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + idx * 0.065);
            osc.frequency.linearRampToValueAtTime(freq * 0.75, now + idx * 0.065 + 0.2);
            gain.gain.setValueAtTime(0.09, now + idx * 0.065);
            gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.065 + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.065);
            osc.stop(now + idx * 0.065 + 0.24);
        });
    }
}

const sfx = new SoundSynth();

// 4. GAME STATE VARIABLES
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let highScore = 0;
let level = 1;
let integrity = 100;
let gameState = 'START';
const mrnaSpeed = 1.6; // Base scrolling speed
let matchStreak = 0;

// Fever Overdrive & Power-up / Viral Timers
let fever = 0;
let isOverdrive = false;
let overdriveTimer = 0;
const OVERDRIVE_DURATION = 480; // ~8 seconds at 60 FPS
let cryoTimer = 0;
const CRYO_DURATION = 360; // ~6 seconds at 60 FPS
let viralSpeedTimer = 0;
const VIRAL_SPEED_DURATION = 360; // 6 seconds at 60 FPS (Yellow Virus)
let doubleDamageTimer = 0;
const DOUBLE_DAMAGE_DURATION = 1200; // 20 seconds at 60 FPS (Red Virus)
let screenShake = 0;

// Hover Brake (Up Arrow Slow Fall): 3.0s max gauge, +0.5s per PERFECT match
const MAX_BRAKE_GAUGE = 180;      // 3.0 seconds at 60 FPS
const BRAKE_REFILL_PERFECT = 30;  // +0.5 seconds at 60 FPS
let brakeGauge = MAX_BRAKE_GAUGE;
let isBraking = false;

function updateBrakeHUD() {
    const bar = document.getElementById('brake-bar');
    const badge = document.getElementById('brake-badge');
    const text = document.getElementById('brake-text');
    const secs = (brakeGauge / 60).toFixed(1);
    const pct = Math.max(0, Math.min(100, (brakeGauge / MAX_BRAKE_GAUGE) * 100));

    if (badge) badge.textContent = `${secs}s / 3.0s`;
    if (bar) {
        bar.style.width = `${pct}%`;
        bar.classList.toggle('braking', isBraking && brakeGauge > 0);
        bar.classList.toggle('empty', brakeGauge <= 0);
    }
    if (text) {
        if (brakeGauge <= 0) {
            text.textContent = `GAUGE EMPTY! HIT PERFECT (+0.5s)`;
        } else if (isBraking && activeTRNA) {
            text.textContent = `▲ HOVER BRAKE ENGAGED (${secs}s)`;
        } else {
            text.textContent = `HOLD ↑ TO SLOW (+0.5s ON PERFECT)`;
        }
    }
}

function getCurrentMrnaSpeed() {
    let mult = 1.0;
    if (cryoTimer > 0) mult *= 0.45;
    if (viralSpeedTimer > 0) mult *= 1.85;
    return mrnaSpeed * mult;
}

function getCurrentFallSpeed() {
    return fallSpeedNormal * (cryoTimer > 0 ? 0.55 : 1.0);
}

// Protein target variables
let targetProtein = null;
let translationProgress = 0; // Number of successfully translated residues

// Maps tracking remaining needed amino acids
let neededCounts = {};
let translatedCounts = {};
let sortedAAs = []; // Required amino acids sorted by frequency in target sequence
let activeAnnouncement = null;
let lastMilestoneReached = 0;

// Dev Mode & Demo Variables
let isAutoMode = false;
let isDemoMode = false;
let autoModeUsed = false;
let lastInputTime = Date.now();
let keyBuffer = '';
let aiTargetBlock = null;

// Translation Queue Globals
let currentTRNACodon = null;
let nextTRNACodon = null;

// Entities
let mrnaChain = [];
let activeTRNA = null;
let particles = [];
let aminoAcidProjectiles = [];
let floatingTexts = [];
let shockwaves = [];
let viruses = [];
let virusSpawnTimer = 90;

// Safe vertical zone for viruses (not too close to top spawn or bottom mRNA rail at y=500)
const VIRUS_MIN_Y = 160;
const VIRUS_MAX_Y = 365;
const MAX_ACTIVE_VIRUSES = 3;

// Config
const mRNAY = 500;
const codonWidth = 120;
const codonHeight = 60;
const tRNAWidth = 80;
const tRNAHeight = 85;
const fallSpeedNormal = 2.0;
const fallSpeedDrop = 15.0;
const BULLSEYE_TOLERANCE = 16; // Center +/- 16px for PERFECT! hit
const GREAT_TOLERANCE = 36;    // Center +/- 36px for GREAT! hit

let mouseX = canvas.width / 2;

// Telemetry log
function logMsg(message, type = 'system') {
    const logBox = document.getElementById('telemetry-log');
    if (!logBox) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}-msg`;
    
    const time = new Date().toTimeString().split(' ')[0];
    entry.innerHTML = `<span style="opacity: 0.5;">[${time}]</span> > ${message}`;
    
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    
    while (logBox.children.length > 40) {
        logBox.removeChild(logBox.firstChild);
    }
}

// 5. MRNA SCROLLING RAIL
function getActiveCodons() {
    const matches = translationProgress;
    
    // Start with 3 most frequent, add 1 for every 2 successful matches
    const activeAAsCount = Math.min(sortedAAs.length, 3 + Math.floor(matches / 2));
    const unlockedAAs = sortedAAs.slice(0, activeAAsCount);
    
    // Start with 1 codon, add 1 synonym for every 5 matches past 10
    const maxCodonsPerAA = 1 + Math.floor(Math.max(0, matches - 10) / 5);
    
    const active = [];
    unlockedAAs.forEach(aa => {
        const needed = neededCounts[aa] || 0;
        const completed = translatedCounts[aa] || 0;
        if (completed < needed) {
            const codons = AA_TO_CODONS[aa] || [];
            const limit = Math.min(codons.length, maxCodonsPerAA);
            active.push(...codons.slice(0, limit));
        }
    });
    
    // Fallback: if somehow empty, return all remaining needed codons
    if (active.length === 0) {
        Object.entries(neededCounts).forEach(([aa, needed]) => {
            const completed = translatedCounts[aa] || 0;
            if (completed < needed) {
                active.push(...(AA_TO_CODONS[aa] || []));
            }
        });
    }

    // Ultimate fallback: if all needed amino acids are completed, return all codons
    if (active.length === 0) {
        active.push(...Object.keys(aminoAcidMap));
    }
    return active;
}

function initMRNA() {
    mrnaChain = [];
    const count = Math.ceil(canvas.width / codonWidth) + 3;
    for (let i = 0; i < count; i++) {
        mrnaChain.push(spawnCodonBlock(i * codonWidth, i >= 2));
    }
}

function spawnCodonBlock(xPosition, allowSpecial = true) {
    const activeCodons = getActiveCodons();
    const randomCodon = activeCodons[Math.floor(Math.random() * activeCodons.length)];
    
    let specialType = null;
    if (allowSpecial) {
        const r = Math.random();
        const repairChance = integrity < 65 ? 0.11 : 0.06;
        if (r < 0.10) {
            specialType = 'GOLD';    // 10%: 3x Residue Burst + 1500 pts
        } else if (r < 0.18) {
            specialType = 'FREEZE';  // 8%: Cryo Slow-Mo (6s)
        } else if (r < 0.18 + repairChance) {
            specialType = 'REPAIR';  // 6-11%: +35% Integrity Repair
        } else if (r < 0.26 + repairChance) {
            specialType = 'HAZARD';  // 8%: Mutated Codon Trap
        }
    }

    return {
        x: xPosition,
        y: mRNAY,
        width: codonWidth,
        height: codonHeight,
        codon: randomCodon,
        translated: false,
        specialType: specialType,
        pulseScale: 1.0,
        successGlow: 0
    };
}

function updateMRNA(dt) {
    const dtScale = dt / 16.667;
    const currentSpeed = getCurrentMrnaSpeed();
    mrnaChain.forEach(block => {
        block.x -= currentSpeed * dtScale;
        
        if (block.successGlow > 0) {
            block.successGlow -= 0.05 * dtScale;
            block.pulseScale = 1.0 + Math.sin(block.successGlow * Math.PI) * 0.15;
        }
    });

    // Scroll block off-screen left and spawn new block right
    if (mrnaChain[0] && mrnaChain[0].x < -codonWidth) {
        mrnaChain.shift();
        const lastBlockX = mrnaChain[mrnaChain.length - 1].x;
        mrnaChain.push(spawnCodonBlock(lastBlockX + codonWidth, true));
    }
}

// Translation Queue Helpers
function updatePreviewCards() {
    const currentCard = document.getElementById('current-card');
    const nextCard = document.getElementById('next-card');
    const container = document.getElementById('preview-container');
    
    if (!currentCard || !nextCard || !container) return;
    
    if (currentTRNACodon) {
        const info = getCodonInfo(currentTRNACodon);
        currentCard.querySelector('.aa-val').textContent = info.aminoAcid;
        currentCard.querySelector('.anticodon-val').innerHTML = formatCodonHTML(info.anticodon);
        currentCard.querySelector('.codon-val').innerHTML = formatCodonHTML(currentTRNACodon);
        currentCard.style.setProperty('--current-color', info.color);
        container.style.setProperty('--current-color', info.color);
    } else {
        currentCard.querySelector('.aa-val').textContent = '-';
        currentCard.querySelector('.anticodon-val').textContent = '-';
        currentCard.querySelector('.codon-val').textContent = '-';
        currentCard.style.removeProperty('--current-color');
    }
    
    if (nextTRNACodon) {
        const info = getCodonInfo(nextTRNACodon);
        nextCard.querySelector('.aa-val').textContent = info.aminoAcid;
        nextCard.querySelector('.anticodon-val').innerHTML = formatCodonHTML(info.anticodon);
        nextCard.querySelector('.codon-val').innerHTML = formatCodonHTML(nextTRNACodon);
        nextCard.style.setProperty('--next-color', info.color);
        container.style.setProperty('--next-color', info.color);
        container.style.setProperty('--next-glow', `${info.color}66`);
    } else {
        nextCard.querySelector('.aa-val').textContent = '-';
        nextCard.querySelector('.anticodon-val').textContent = '-';
        nextCard.querySelector('.codon-val').textContent = '-';
        nextCard.style.removeProperty('--next-color');
        container.style.removeProperty('--next-glow');
    }
}

function animateQueueTransition(newNextCodon) {
    const previewContainer = document.getElementById('preview-container');
    if (!previewContainer) return;
    
    previewContainer.classList.add('animating');
    
    setTimeout(() => {
        currentTRNACodon = nextTRNACodon;
        nextTRNACodon = newNextCodon;
        
        updatePreviewCards();
        previewContainer.classList.remove('animating');
    }, 400);
}

// 6. TRNA SHUTTLE
class TRNA {
    constructor(targetCodon) {
        const info = getCodonInfo(targetCodon);
        
        this.anticodon = info.anticodon;
        this.aminoAcid = info.aminoAcid;
        this.color = info.color;
        this.aaClass = info.aaClass;
        
        this.x = canvas.width / 2 - tRNAWidth / 2;
        this.y = -tRNAHeight;
        this.width = tRNAWidth;
        this.height = tRNAHeight;
        
        this.speedY = getCurrentFallSpeed();
        this.quickDropping = false;
        this.isSlowBraking = false;
        this.targetX = this.x;
        this.glowPhase = 0;
        this.noPointsCurse = false;
        
        sfx.playSpawn();
    }

    update(dt) {
        const dtScale = dt / 16.667;
        const canBrake = isBraking && brakeGauge > 0 && !isAutoMode && !isDemoMode;
        if (canBrake) {
            this.quickDropping = false;
            this.isSlowBraking = true;
            this.speedY = getCurrentFallSpeed() * 0.22;
            brakeGauge = Math.max(0, brakeGauge - dtScale);
            updateBrakeHUD();
        } else {
            this.isSlowBraking = false;
            if (!this.quickDropping) {
                this.speedY = getCurrentFallSpeed();
            }
            if (isBraking) updateBrakeHUD();
        }
        this.y += this.speedY * dtScale;
        this.glowPhase += 0.1 * dtScale;
        
        // Framerate-independent LERP horizontal movement
        const lerpFactor = 1 - Math.pow(1 - 0.2, dtScale);
        this.x += (this.targetX - this.x) * lerpFactor;
        
        if (this.x < 10) this.x = 10;
        if (this.x > canvas.width - this.width - 10) this.x = canvas.width - this.width - 10;
    }

    draw() {
        ctx.save();
        const cargoRadius = 15;
        const cargoX = this.x + this.width / 2;
        const cargoY = this.y + cargoRadius + 5;

        // 0. Laser Aiming Guide & Bullseye Lock Reticle
        const blockUnder = mrnaChain.find(b => cargoX >= b.x && cargoX < b.x + b.width);
        let isMatchingUnder = false;
        let isBullseyeLock = false;
        let isHazardUnder = false;
        if (blockUnder && !blockUnder.translated) {
            if (blockUnder.specialType === 'HAZARD' && !isOverdrive) {
                isHazardUnder = true;
            } else if (getComplementaryCodon(blockUnder.codon) === this.anticodon || (blockUnder.specialType === 'HAZARD' && isOverdrive)) {
                isMatchingUnder = true;
                const blockCenter = blockUnder.x + blockUnder.width / 2;
                if (Math.abs(cargoX - blockCenter) <= BULLSEYE_TOLERANCE) {
                    isBullseyeLock = true;
                }
            }
        }

        ctx.save();
        ctx.setLineDash([5, 5]);
        if (isHazardUnder) {
            ctx.strokeStyle = 'rgba(255, 0, 127, 0.7)';
            ctx.lineWidth = 2;
        } else if (isBullseyeLock) {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.85)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffd700';
        } else if (isMatchingUnder) {
            ctx.strokeStyle = 'rgba(46, 255, 95, 0.55)';
            ctx.lineWidth = 1.8;
        } else {
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
            ctx.lineWidth = 1;
        }
        ctx.beginPath();
        ctx.moveTo(cargoX, this.y + 78);
        ctx.lineTo(cargoX, mRNAY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target reticle at rail impact point
        if (isBullseyeLock) {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(cargoX, mRNAY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = 'bold 9px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🎯 BULLSEYE', cargoX, mRNAY - 10);
        } else if (isHazardUnder) {
            ctx.fillStyle = '#ff007f';
            ctx.font = 'bold 9px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('☣ DANGER', cargoX, mRNAY - 10);
        }
        ctx.restore();

        ctx.shadowBlur = isOverdrive ? 22 : (this.noPointsCurse ? 18 : 15);
        ctx.shadowColor = isOverdrive ? '#ffd700' : (this.noPointsCurse ? '#39ff14' : this.color);
        
        // 1. Cargo ball
        const grad = ctx.createRadialGradient(cargoX - 4, cargoY - 4, 2, cargoX, cargoY, cargoRadius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, this.noPointsCurse && !isOverdrive ? '#39ff14' : this.color);
        grad.addColorStop(1, '#02050f');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cargoX, cargoY, cargoRadius, 0, Math.PI * 2);
        ctx.fill();

        if (this.noPointsCurse && !isOverdrive) {
            ctx.save();
            ctx.font = 'bold 9px Orbitron, monospace';
            ctx.fillStyle = '#39ff14';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#39ff14';
            ctx.textAlign = 'center';
            ctx.fillText('🦠 0 PTS', cargoX, this.y - 4);
            ctx.restore();
        }
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.aminoAcid, cargoX, cargoY);
        
        // 2. Body Cloverleaf
        ctx.strokeStyle = isOverdrive ? '#ffd700' : (this.noPointsCurse ? '#39ff14' : this.color);
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = isOverdrive ? '#ffd700' : (this.noPointsCurse ? '#39ff14' : this.color);
        
        ctx.beginPath();
        ctx.moveTo(cargoX, cargoY + cargoRadius);
        ctx.lineTo(cargoX, this.y + 45);
        ctx.arc(cargoX - 18, this.y + 35, 10, 0, Math.PI * 2);
        ctx.arc(cargoX + 18, this.y + 35, 10, 0, Math.PI * 2);
        ctx.moveTo(this.x + 15, this.y + 55);
        ctx.lineTo(this.x + this.width - 15, this.y + 55);
        ctx.stroke();

        // 3. Anticodon Letters
        ctx.shadowBlur = 5;
        const bases = this.anticodon.split('');
        const letterSpacing = 16;
        const startX = cargoX - letterSpacing;
        
        bases.forEach((base, i) => {
            ctx.fillStyle = getBaseColor(base);
            ctx.font = 'bold 13px Orbitron, monospace';
            ctx.fillText(base, startX + i * letterSpacing, this.y + 75);
        });

        // 4. Hover Brake retro-thruster jets & mini gauge when holding Up Arrow
        if (this.isSlowBraking) {
            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#00f0ff';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2.2;
            const flameLen = 8 + Math.random() * 6;
            // Left and right stabilizer jets firing downward to slow descent
            ctx.beginPath();
            ctx.moveTo(cargoX - 22, this.y + 56);
            ctx.lineTo(cargoX - 25, this.y + 56 + flameLen);
            ctx.moveTo(cargoX + 22, this.y + 56);
            ctx.lineTo(cargoX + 25, this.y + 56 + flameLen);
            ctx.stroke();

            // Mini brake gauge above tRNA
            const secsLeft = (brakeGauge / 60).toFixed(1);
            ctx.font = 'bold 8.5px Orbitron, monospace';
            ctx.fillStyle = '#00f0ff';
            ctx.textAlign = 'center';
            ctx.fillText(`▲ BRAKE ${secsLeft}s`, cargoX, this.noPointsCurse ? this.y - 15 : this.y - 4);
            ctx.restore();
        } else if (this.quickDropping) {
            ctx.shadowBlur = 8;
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(cargoX + (Math.random() - 0.5) * 10, this.y + 15, Math.random() * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}

// 6B. VIRUS OBSTACLES
class VirusObstacle {
    constructor(type, spawnOnScreen = false) {
        this.type = type; // 'GREEN' (common, 0 pts), 'YELLOW' (uncommon, fast mRNA 6s), 'RED' (rare, 2x dmg 20s)
        this.radius = 19;
        this.dir = Math.random() < 0.5 ? 1 : -1;
        if (spawnOnScreen) {
            this.x = 120 + Math.random() * (canvas.width - 240);
        } else {
            this.x = this.dir === 1 ? -35 : canvas.width + 35;
        }
        // Safe vertical band: never too close to top (tRNA spawn 0..145) or too close to mRNA rail (500)
        this.baseY = VIRUS_MIN_Y + Math.random() * (VIRUS_MAX_Y - VIRUS_MIN_Y);
        this.y = this.baseY;
        const baseSpeed = 1.05 + Math.random() * 0.85 + Math.min(0.6, (level - 1) * 0.05);
        this.vx = this.dir * baseSpeed;
        this.bobPhase = Math.random() * Math.PI * 2;
        this.bobAmp = 9 + Math.random() * 7;
        this.bobSpeed = 0.035 + Math.random() * 0.02;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() < 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.02);

        if (this.type === 'GREEN') {
            this.color = '#39ff14';
            this.coreColor = '#0b5c00';
            this.label = '0 PTS';
        } else if (this.type === 'YELLOW') {
            this.color = '#ffd700';
            this.coreColor = '#735700';
            this.label = 'FAST';
        } else {
            this.color = '#ff3131';
            this.coreColor = '#800808';
            this.label = '2x DMG';
        }
    }

    update(dt) {
        const dtScale = dt / 16.667;
        const cryoFactor = cryoTimer > 0 ? 0.5 : 1.0;
        this.x += this.vx * dtScale * cryoFactor;
        this.bobPhase += this.bobSpeed * dtScale * cryoFactor;
        this.y = Math.max(VIRUS_MIN_Y - 8, Math.min(VIRUS_MAX_Y + 8, this.baseY + Math.sin(this.bobPhase) * this.bobAmp));
        this.rot += this.rotSpeed * dtScale * cryoFactor;
    }

    isOffScreen() {
        return (this.dir === 1 && this.x > canvas.width + 55) || (this.dir === -1 && this.x < -55);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // During Overdrive, viruses look vulnerable/translucent with gold static
        if (isOverdrive) {
            ctx.globalAlpha = 0.65;
        }

        ctx.shadowBlur = 14;
        ctx.shadowColor = isOverdrive ? '#ffd700' : this.color;

        // Draw rotating viral spikes
        ctx.save();
        ctx.rotate(this.rot);
        const numSpikes = 8;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2.2;
        for (let i = 0; i < numSpikes; i++) {
            const angle = (i / numSpikes) * Math.PI * 2;
            const innerX = Math.cos(angle) * (this.radius - 4);
            const innerY = Math.sin(angle) * (this.radius - 4);
            const outerX = Math.cos(angle) * (this.radius + 6);
            const outerY = Math.sin(angle) * (this.radius + 6);
            ctx.beginPath();
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(outerX, outerY);
            ctx.stroke();

            // Spike knob receptor
            ctx.beginPath();
            ctx.arc(outerX, outerY, 2.6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Draw icosahedral/capsid body
        const grad = ctx.createRadialGradient(-4, -4, 2, 0, 0, this.radius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, this.color);
        grad.addColorStop(1, this.coreColor);
        ctx.fillStyle = grad;
        ctx.strokeStyle = isOverdrive ? '#ffd700' : '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Label inside/below capsid
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 7.5px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(isOverdrive ? 'IMMUNE' : this.label, 0, 0.5);

        ctx.restore();
    }
}

function rollVirusType() {
    const r = Math.random();
    if (r < 0.58) return 'GREEN';   // Common (58%): No points awarded for match
    if (r < 0.86) return 'YELLOW';  // Uncommon (28%): mRNA moves faster for 6s
    return 'RED';                   // Rare (14%): Double damage for 20s
}

function spawnVirus(spawnOnScreen = false) {
    if (viruses.length >= MAX_ACTIVE_VIRUSES) return;
    // Try to pick a vertical height not too crowded with existing viruses
    const v = new VirusObstacle(rollVirusType(), spawnOnScreen);
    for (let attempt = 0; attempt < 5; attempt++) {
        const tooClose = viruses.some(other => Math.abs(other.baseY - v.baseY) < 42 && Math.abs(other.x - v.x) < 160);
        if (!tooClose) break;
        v.baseY = VIRUS_MIN_Y + Math.random() * (VIRUS_MAX_Y - VIRUS_MIN_Y);
        v.y = v.baseY;
    }
    viruses.push(v);
}

function updateViruses(dt) {
    const dtScale = dt / 16.667;
    virusSpawnTimer -= dtScale;
    if (virusSpawnTimer <= 0) {
        if (viruses.length < MAX_ACTIVE_VIRUSES) {
            spawnVirus(false);
        }
        // Spawn every ~2.8 to 4.5 seconds
        virusSpawnTimer = Math.max(120, 230 - level * 5) + Math.random() * 80;
    }

    for (let i = viruses.length - 1; i >= 0; i--) {
        viruses[i].update(dt);
        if (viruses[i].isOffScreen()) {
            viruses.splice(i, 1);
        }
    }
}

function checkVirusCollisions() {
    if (!activeTRNA) return;

    // Approximate falling tRNA hit area with two circles: cargo ball (top) and cloverleaf body (lower)
    const trnaCenterX = activeTRNA.x + tRNAWidth / 2;
    const hitPoints = [
        { x: trnaCenterX, y: activeTRNA.y + 15, r: 15 },
        { x: trnaCenterX, y: activeTRNA.y + 48, r: 24 }
    ];

    for (let i = viruses.length - 1; i >= 0; i--) {
        const v = viruses[i];
        const collided = hitPoints.some(hp => {
            const dx = hp.x - v.x;
            const dy = hp.y - v.y;
            const minDist = hp.r + v.radius;
            return (dx * dx + dy * dy) <= minDist * minDist;
        });

        if (collided) {
            viruses.splice(i, 1);

            // FEVER OVERDRIVE IMMUNITY
            if (isOverdrive) {
                sfx.playPerfect();
                spawnShockwave(v.x, v.y, '#ffd700', 65);
                spawnExplosion(v.x, v.y, '#ffd700', 25);
                spawnFloatingText(v.x, v.y - 10, `⚡ FEVER IMMUNE! VIRUS VAPORIZED`, '#ffd700', 12);
                logMsg(`⚡ FEVER IMMUNITY: Vaporized ${v.type} virus obstacle cleanly!`, 'level');
                continue;
            }

            // Apply Virus Effect
            sfx.playVirusHit(v.type);
            screenShake = Math.max(screenShake, 8);
            spawnShockwave(v.x, v.y, v.color, 75);
            spawnExplosion(v.x, v.y, v.color, 30);

            if (v.type === 'GREEN') {
                activeTRNA.noPointsCurse = true;
                spawnFloatingText(v.x, v.y - 12, `🦠 GREEN VIRUS! 0 PTS THIS MATCH`, '#39ff14', 13);
                logMsg(`🦠 GREEN VIRUS HIT: Current tRNA infected — 0 points will be awarded for this match!`, 'error');
            } else if (v.type === 'YELLOW') {
                viralSpeedTimer = VIRAL_SPEED_DURATION; // 6 seconds at 60fps
                spawnFloatingText(v.x, v.y - 12, `🦠 YELLOW VIRUS! FAST mRNA (6s)`, '#ffd700', 13);
                logMsg(`🦠 YELLOW VIRUS HIT: mRNA chain accelerated for 6 seconds!`, 'error');
            } else if (v.type === 'RED') {
                doubleDamageTimer = DOUBLE_DAMAGE_DURATION; // 20 seconds at 60fps
                spawnFloatingText(v.x, v.y - 12, `🦠 RED VIRUS! 2x DAMAGE (20s)`, '#ff3131', 14);
                logMsg(`🦠 RED VIRUS HIT: Ribosome vulnerable — Double Damage for 20 seconds!`, 'error');
            }
        }
    }
}

// 7. POLYPEPTIDE HUDS (Static Sequence filled out of order)
function initializeProteinHUD() {
    const chainList = document.getElementById('chain-container');
    if (!chainList) return;
    
    chainList.innerHTML = '';
    const seq = targetProtein.sequence.split('');
    seq.forEach((aa, i) => {
        const node = document.createElement('span');
        node.className = `aa-node aa-empty`;
        node.id = `aa-node-${i}`;
        node.textContent = aa;
        chainList.appendChild(node);
    });
    chainList.scrollLeft = 0;
    
    document.getElementById('hud-residue-counter').textContent = `0 / ${seq.length}`;
}

function fillHUDResidue(aa, color) {
    const chainList = document.getElementById('chain-container');
    if (!chainList) return;
    
    const oneLetter = THREE_TO_ONE[aa] || '?';
    
    // Find the first empty node representing this specific amino acid type
    const emptyNodes = Array.from(chainList.querySelectorAll('.aa-node.aa-empty'));
    const targetNode = emptyNodes.find(node => node.textContent === oneLetter);
    
    if (targetNode) {
        targetNode.classList.remove('aa-empty');
        targetNode.classList.remove('aa-pulse-target');
        targetNode.style.removeProperty('--target-glow-color');
        targetNode.classList.add('aa-filled');
        targetNode.style.background = `${color}cc`;
        targetNode.style.borderColor = color;
        targetNode.style.color = '#fff';
        targetNode.style.boxShadow = `0 0 12px ${color}, inset 0 0 8px rgba(255,255,255,0.6)`;
        
        // Update HUD residue completion counter
        const completedResidues = chainList.querySelectorAll('.aa-node.aa-filled').length;
        document.getElementById('hud-residue-counter').textContent = `${completedResidues} / ${targetProtein.sequence.length}`;
    }
}

function highlightTargetHUDNode(aa, color) {
    const chainList = document.getElementById('chain-container');
    if (!chainList) return;
    
    // Clear any previous highlights
    chainList.querySelectorAll('.aa-node.aa-pulse-target').forEach(node => {
        node.classList.remove('aa-pulse-target');
        node.style.removeProperty('--target-glow-color');
    });
    
    const oneLetter = THREE_TO_ONE[aa] || '?';
    
    // Find the first empty node matching this amino acid type
    const emptyNodes = Array.from(chainList.querySelectorAll('.aa-node.aa-empty'));
    const targetNode = emptyNodes.find(node => node.textContent === oneLetter);
    
    if (targetNode) {
        targetNode.classList.add('aa-pulse-target');
        targetNode.style.setProperty('--target-glow-color', color);
        
        // Auto scroll to keep centered
        const nodeOffset = targetNode.offsetLeft;
        const containerWidth = chainList.clientWidth;
        chainList.scrollTo({
            left: nodeOffset - containerWidth / 2 + targetNode.clientWidth / 2,
            behavior: 'smooth'
        });
    }
}

// 8. PARTICLES & PROJECTILES
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8 - 3;
        this.alpha = 1;
        this.decay = 0.02 + Math.random() * 0.02;
        this.size = 2 + Math.random() * 4;
    }

    update(dt) {
        const dtScale = dt / 16.667;
        this.x += this.vx * dtScale;
        this.y += this.vy * dtScale;
        this.vy += 0.05 * dtScale;
        this.alpha -= this.decay * dtScale;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function spawnExplosion(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

class FloatingText {
    constructor(x, y, text, color = '#ffffff', size = 14) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.size = size;
        this.alpha = 1.0;
        this.vy = -1.6;
        this.life = 0;
    }

    update(dt) {
        const dtScale = dt / 16.667;
        this.y += this.vy * dtScale;
        this.vy *= Math.pow(0.97, dtScale);
        this.life += dtScale;
        if (this.life > 18) {
            this.alpha -= 0.032 * dtScale;
        }
    }

    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.font = `bold ${this.size}px Orbitron, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

function spawnFloatingText(x, y, text, color = '#ffffff', size = 14) {
    const clampedX = Math.max(85, Math.min(canvas.width - 85, x));
    floatingTexts.push(new FloatingText(clampedX, y, text, color, size));
}

class Shockwave {
    constructor(x, y, color, maxRadius = 65) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 8;
        this.maxRadius = maxRadius;
        this.alpha = 0.95;
    }

    update(dt) {
        const dtScale = dt / 16.667;
        this.radius += (this.maxRadius - this.radius) * 0.16 * dtScale;
        this.alpha -= 0.04 * dtScale;
    }

    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

function spawnShockwave(x, y, color, maxRadius = 65) {
    shockwaves.push(new Shockwave(x, y, color, maxRadius));
}

class AAProjectile {
    constructor(startX, startY, endX, endY, aminoAcid, color, spreadOffset = 0) {
        this.x = startX;
        this.y = startY;
        this.endX = endX;
        this.endY = endY;
        this.aminoAcid = aminoAcid;
        this.color = color;
        this.progress = 0;
        this.speed = 0.04;
        
        this.ctrlX = startX + (endX - startX) / 2 + spreadOffset + (Math.random() - 0.5) * 40;
        this.ctrlY = startY - 120;
    }

    update(dt) {
        const dtScale = dt / 16.667;
        this.progress += this.speed * dtScale;
        if (this.progress > 1) this.progress = 1;
        
        const t = this.progress;
        const mt = 1 - t;
        
        this.x = mt * mt * this.x + 2 * mt * t * this.ctrlX + t * t * this.endX;
        this.y = mt * mt * this.y + 2 * mt * t * this.ctrlY + t * t * this.endY;
        
        if (Math.random() < 0.3 * dtScale) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    draw() {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 11, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.aminoAcid, this.x, this.y);
        ctx.restore();
    }
}

// Helper to synthesize 1 or more needed residues at once (with spillover to other needed AAs)
function synthesizeResidues(primaryAA, primaryColor, count, startX, startY) {
    let synthesizedCount = 0;
    for (let i = 0; i < count; i++) {
        if (translationProgress >= targetProtein.sequence.length) break;

        let chosenAA = null;
        if ((translatedCounts[primaryAA] || 0) < (neededCounts[primaryAA] || 0)) {
            chosenAA = primaryAA;
        } else {
            // Spill over bonus synthesis to any other still-needed amino acid
            chosenAA = sortedAAs.find(aa => (translatedCounts[aa] || 0) < (neededCounts[aa] || 0));
        }

        const spread = (i - (count - 1) / 2) * 55;
        if (chosenAA) {
            translationProgress++;
            translatedCounts[chosenAA] = (translatedCounts[chosenAA] || 0) + 1;
            synthesizedCount++;

            const aaColor = (AA_DETAILS[chosenAA] && AA_DETAILS[chosenAA].color) || primaryColor;
            const proj = new AAProjectile(
                startX,
                startY,
                Math.max(40, Math.min(canvas.width - 40, startX + spread * 0.6)),
                0,
                chosenAA,
                aaColor,
                spread
            );
            proj.isExtra = false;
            aminoAcidProjectiles.push(proj);
        } else {
            const proj = new AAProjectile(startX, startY, startX + spread * 0.5, 0, primaryAA, primaryColor, spread);
            proj.isExtra = true;
            aminoAcidProjectiles.push(proj);
        }
    }
    return synthesizedCount;
}

function updateFeverBar() {
    const bar = document.getElementById('fever-bar');
    const text = document.getElementById('fever-text');
    const streakEl = document.getElementById('streak-badge');
    const canvasContainer = document.querySelector('.canvas-container');

    if (streakEl) {
        streakEl.textContent = `${matchStreak}x STREAK`;
    }
    if (!bar || !text) return;

    if (isOverdrive) {
        const pct = Math.max(0, (overdriveTimer / OVERDRIVE_DURATION) * 100);
        bar.style.width = `${pct}%`;
        bar.classList.add('overdrive');
        const secs = Math.ceil(overdriveTimer / 60);
        text.textContent = `⚡ OVERDRIVE ACTIVE (${secs}s) - 3x AA!`;
        text.classList.add('overdrive-active');
        if (canvasContainer) canvasContainer.classList.add('overdrive-mode');
    } else {
        bar.style.width = `${Math.min(100, Math.max(0, fever))}%`;
        bar.classList.remove('overdrive');
        text.classList.remove('overdrive-active');
        if (canvasContainer) canvasContainer.classList.remove('overdrive-mode');

        if (fever >= 75) {
            text.textContent = `FEVER ${Math.floor(fever)}% - ALMOST READY!`;
        } else if (matchStreak >= 3) {
            text.textContent = `COMBO x${matchStreak} - HIT BULLSEYE!`;
        } else {
            text.textContent = `AIM BULLSEYE FOR FEVER!`;
        }
    }
}

function triggerOverdrive() {
    isOverdrive = true;
    overdriveTimer = OVERDRIVE_DURATION;
    fever = 100;
    // Fever mode grants full immunity to all viruses and cleanses active viral debuffs!
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    if (activeTRNA) activeTRNA.noPointsCurse = false;
    screenShake = 10;
    sfx.playOverdrive();
    updateFeverBar();

    logMsg(`⚡ RIBOSOME OVERDRIVE ACTIVATED! 2x Score, 3x Residue Burst, Virus Immunity & Mutant Purification!`, 'level');

    activeAnnouncement = {
        text: `⚡ RIBOSOME OVERDRIVE! ⚡`,
        subtext: `2x Score • 3x Residue Burst • Virus Immunity & Mutant Purification!`,
        timer: 85,
        maxTimer: 85
    };

    spawnShockwave(canvas.width / 2, canvas.height / 2, '#ffd700', 180);
    spawnExplosion(canvas.width / 2, mRNAY, '#ffd700', 35);
    spawnExplosion(canvas.width / 2 - 160, mRNAY, '#00f0ff', 25);
    spawnExplosion(canvas.width / 2 + 160, mRNAY, '#ff007f', 25);
}

// 9. GAME ENGINE COLLISION & MATCH LOGIC
function handleMatchSuccess(block, matchedTRNA) {
    block.translated = true;
    block.successGlow = 1.0;
    
    const hitX = matchedTRNA.x + tRNAWidth / 2;
    const hitY = matchedTRNA.y + 20;
    const blockCenterX = block.x + block.width / 2;
    const offset = Math.abs(hitX - blockCenterX);

    // 1. Bullseye Precision Grading
    let precisionType = 'GOOD';
    let precisionMult = 1.0;
    let feverGain = 10;
    let residuesToSynthesize = 1;

    if (offset <= BULLSEYE_TOLERANCE) {
        precisionType = 'PERFECT';
        precisionMult = 3.0;
        feverGain = 28;
        residuesToSynthesize = 2; // Bullseye synthesizes 2 residues at once!
    } else if (offset <= GREAT_TOLERANCE) {
        precisionType = 'GREAT';
        precisionMult = 1.5;
        feverGain = 16;
        residuesToSynthesize = 1;
    }

    if (isOverdrive) {
        residuesToSynthesize = Math.max(residuesToSynthesize, 3);
        precisionMult *= 2.0;
    }

    matchStreak++;
    let pointsAwarded = Math.round(100 * level * matchStreak * precisionMult);

    // 2. Special Codon Modifiers
    const special = block.specialType;
    block.specialType = null;

    if (special === 'GOLD') {
        const goldBonus = 1500 * level;
        pointsAwarded += goldBonus;
        residuesToSynthesize += 2; // Total 3-5 residues synthesized!
        feverGain += 35;
        sfx.playPowerup('GOLD');
        spawnShockwave(hitX, mRNAY, '#ffd700', 110);
        spawnExplosion(hitX, hitY, '#ffd700', 40);
        spawnFloatingText(hitX, mRNAY - 55, `★ GOLDEN x${residuesToSynthesize} BURST! +${goldBonus}`, '#ffd700', 15);
        logMsg(`★ GOLDEN CATALYST: Synthesizing ${residuesToSynthesize} residues! (+${goldBonus} bonus pts)`, 'level');
    } else if (special === 'FREEZE') {
        const freezeBonus = 600 * level;
        pointsAwarded += freezeBonus;
        cryoTimer = CRYO_DURATION;
        feverGain += 18;
        sfx.playPowerup('FREEZE');
        spawnShockwave(hitX, mRNAY, '#00f0ff', 100);
        spawnExplosion(hitX, hitY, '#00f0ff', 35);
        spawnFloatingText(hitX, mRNAY - 55, `❄ CRYO SLOW-MO (6s)! +${freezeBonus}`, '#00f0ff', 15);
        logMsg(`❄ CRYO-STASIS ACTIVATED: mRNA & tRNA slowed for 6 seconds!`, 'level');
    } else if (special === 'REPAIR') {
        const repairBonus = 500 * level;
        pointsAwarded += repairBonus;
        integrity = Math.min(100, integrity + 35);
        feverGain += 15;
        sfx.playPowerup('REPAIR');
        spawnShockwave(hitX, mRNAY, '#39ff14', 95);
        spawnExplosion(hitX, hitY, '#39ff14', 35);
        spawnFloatingText(hitX, mRNAY - 55, `✚ +35% INTEGRITY REPAIRED!`, '#39ff14', 15);
        logMsg(`✚ NANO-REPAIR: Ribosome integrity restored by +35%!`, 'success');
    } else if (special === 'HAZARD' && isOverdrive) {
        const purifyBonus = 2000 * level;
        pointsAwarded += purifyBonus;
        residuesToSynthesize = Math.max(residuesToSynthesize, 3);
        sfx.playPerfect();
        spawnShockwave(hitX, mRNAY, '#ff007f', 120);
        spawnFloatingText(hitX, mRNAY - 55, `⚡ MUTANT PURIFIED! +${purifyBonus}`, '#ffea00', 16);
        logMsg(`⚡ OVERDRIVE PURIFICATION: Cleansed mutant codon (${block.codon}) for +${purifyBonus} pts!`, 'level');
    }

    // Green Virus Curse: No points awarded for this match (unless Fever Overdrive is active)
    const greenVirusNullified = matchedTRNA.noPointsCurse && !isOverdrive;
    if (greenVirusNullified) {
        pointsAwarded = 0;
    }

    // Replenish +0.5s Hover Brake gauge on each PERFECT match!
    if (precisionType === 'PERFECT') {
        brakeGauge = Math.min(MAX_BRAKE_GAUGE, brakeGauge + BRAKE_REFILL_PERFECT);
        updateBrakeHUD();
    }

    score += pointsAwarded;
    document.getElementById('score-val').textContent = String(score).padStart(5, '0');
    
    const healAmount = isOverdrive ? 10 : (precisionType === 'PERFECT' ? 8 : 5);
    integrity = Math.min(100, integrity + healAmount);
    updateIntegrityBar();

    // 3. Fever Gauge Update
    if (!isOverdrive) {
        fever = Math.min(100, fever + feverGain);
        if (fever >= 100) {
            triggerOverdrive();
        } else {
            updateFeverBar();
        }
    } else {
        updateFeverBar();
    }

    const aa = matchedTRNA.aminoAcid;
    const color = matchedTRNA.color;
    
    // 4. Precision Audio & Floating Feedback
    if (greenVirusNullified) {
        sfx.playMatch();
        spawnShockwave(hitX, mRNAY, '#39ff14', 55);
        spawnFloatingText(hitX, mRNAY - 28, `🦠 GREEN VIRUS: +0 PTS!${precisionType === 'PERFECT' ? ' (+0.5s ↑)' : ''}`, '#39ff14', 14);
    } else if (precisionType === 'PERFECT') {
        if (!special) sfx.playPerfect();
        spawnShockwave(hitX, mRNAY, '#ffd700', 80);
        spawnFloatingText(hitX, mRNAY - 28, `🎯 PERFECT! +${pointsAwarded} (${residuesToSynthesize}x AA • +0.5s ↑)`, '#ffd700', 14);
    } else if (precisionType === 'GREAT') {
        if (!special) sfx.playMatch();
        spawnShockwave(hitX, mRNAY, color, 55);
        spawnFloatingText(hitX, mRNAY - 28, `GREAT! +${pointsAwarded}`, '#00f0ff', 13);
    } else {
        if (!special) sfx.playMatch();
        spawnFloatingText(hitX, mRNAY - 25, `+${pointsAwarded}`, '#2eff5f', 12);
    }

    const addedCount = synthesizeResidues(aa, color, residuesToSynthesize, hitX, hitY);
    if (addedCount > 0) {
        logMsg(`${precisionType} MATCH: tRNA (${matchedTRNA.anticodon}) + (${block.codon}) -> +${addedCount} residue(s) (+${pointsAwarded} pts${greenVirusNullified ? ' [GREEN VIRUS 0 PTS]' : ''}${precisionType === 'PERFECT' ? ' [+0.5s BRAKE]' : ''})`, 'success');
    } else {
        logMsg(`CLEANUP MATCH: paired tRNA (${matchedTRNA.anticodon}) with extra Codon (${block.codon}). (+${pointsAwarded} pts)`, 'success');
    }
    
    spawnExplosion(hitX, hitY, precisionType === 'PERFECT' ? '#ffd700' : color, precisionType === 'PERFECT' ? 35 : 22);
    
    activeTRNA = null;
    
    // Animate the Translation Queue shift and spawn next tRNA if protein is not complete yet
    if (translationProgress < targetProtein.sequence.length) {
        const newNextCodon = selectTargetCodon();
        animateQueueTransition(newNextCodon);
        setTimeout(spawnNewTRNA, 500);
    }
}

function handleHazardHit(block, matchedTRNA) {
    block.translated = true;
    block.specialType = null;
    matchStreak = 0;
    const dmgMult = (doubleDamageTimer > 0 && !isOverdrive) ? 2 : 1;
    const penalty = 25 * dmgMult;
    integrity = Math.max(0, integrity - penalty);
    fever = Math.max(0, fever - 40);
    screenShake = 14;
    updateIntegrityBar();
    updateFeverBar();

    const hitX = matchedTRNA.x + tRNAWidth / 2;
    sfx.playHazard();
    spawnShockwave(hitX, mRNAY, '#ff007f', 95);
    spawnExplosion(hitX, matchedTRNA.y + 50, '#ff007f', 40);
    spawnFloatingText(hitX, mRNAY - 35, `☣ MUTAGENIC SHOCK! -${penalty}%${dmgMult > 1 ? ' (2x VIRUS!)' : ''}`, '#ff007f', 15);
    logMsg(`☣ HAZARD: Docked with mutated codon (${block.codon})! Ribosome corrupted (-${penalty}%${dmgMult > 1 ? ' [2x RED VIRUS]' : ''})`, 'error');

    activeTRNA = null;

    if (integrity <= 0) {
        triggerGameOver();
    } else if (translationProgress < targetProtein.sequence.length) {
        const newNextCodon = selectTargetCodon();
        animateQueueTransition(newNextCodon);
        setTimeout(spawnNewTRNA, 550);
    }
}

function handleMatchFailure(block, matchedTRNA) {
    matchStreak = 0;
    const dmgMult = (doubleDamageTimer > 0 && !isOverdrive) ? 2 : 1;
    const penalty = 20 * dmgMult;
    integrity = Math.max(0, integrity - penalty);
    fever = Math.max(0, fever - 30);
    screenShake = 9;
    updateIntegrityBar();
    updateFeverBar();
    
    const hitX = matchedTRNA.x + tRNAWidth / 2;
    sfx.playMismatch();
    
    if (block) {
        logMsg(`MISMATCH: tRNA (${matchedTRNA.anticodon}) mismatched codon (${block.codon})! Ribosome damaged (-${penalty}%${dmgMult > 1 ? ' [2x RED VIRUS]' : ''})`, 'error');
        spawnExplosion(hitX, matchedTRNA.y + 50, '#ff007f', 30);
        spawnFloatingText(hitX, mRNAY - 28, `MISMATCH! -${penalty}%${dmgMult > 1 ? ' (2x!)' : ''}`, '#ff007f', 13);
    } else {
        logMsg(`MISS: tRNA fell out of target bounds! Ribosome damaged (-${penalty}%${dmgMult > 1 ? ' [2x RED VIRUS]' : ''})`, 'error');
        spawnExplosion(hitX, matchedTRNA.y + 50, '#ff0000', 15);
        spawnFloatingText(hitX, mRNAY - 28, `MISSED! -${penalty}%${dmgMult > 1 ? ' (2x!)' : ''}`, '#ff3131', 13);
    }
    
    activeTRNA = null;
    
    if (integrity <= 0) {
        triggerGameOver();
    } else if (translationProgress < targetProtein.sequence.length) {
        const newNextCodon = selectTargetCodon();
        animateQueueTransition(newNextCodon);
        setTimeout(spawnNewTRNA, 550);
    }
}

function checkCollision() {
    if (!activeTRNA) return;
    
    if (activeTRNA.y + tRNAHeight >= mRNAY) {
        const trnaCenterX = activeTRNA.x + tRNAWidth / 2;
        const matchedBlock = mrnaChain.find(block => 
            trnaCenterX >= block.x && trnaCenterX < block.x + block.width
        );

        if (matchedBlock) {
            if (matchedBlock.translated) {
                handleMatchFailure(null, activeTRNA);
                return;
            }

            // Check for Mutated Hazard block
            if (matchedBlock.specialType === 'HAZARD') {
                if (isOverdrive) {
                    // Overdrive purifies ANY mutant block on contact!
                    handleMatchSuccess(matchedBlock, activeTRNA);
                } else {
                    handleHazardHit(matchedBlock, activeTRNA);
                }
                return;
            }
            
            // Check if tRNA anticodon is complementary to the collided block codon
            const expectedAnticodon = getComplementaryCodon(matchedBlock.codon);
            if (activeTRNA.anticodon === expectedAnticodon) {
                handleMatchSuccess(matchedBlock, activeTRNA);
            } else {
                handleMatchFailure(matchedBlock, activeTRNA);
            }
        } else {
            handleMatchFailure(null, activeTRNA);
        }
    }
}

const MIN_SAFE_TARGET_X = 288; // 3 seconds * 96 px/sec at 60 FPS (mrnaSpeed = 1.6 px/frame)

function selectTargetCodon() {
    // Prioritize untranslated non-hazard blocks that are far enough to the right (x >= 288px, >= 3s remaining)
    const safeBlocks = mrnaChain.filter(block => !block.translated && block.specialType !== 'HAZARD' && block.x >= MIN_SAFE_TARGET_X);

    if (safeBlocks.length > 0) {
        const block = safeBlocks[Math.floor(Math.random() * safeBlocks.length)];
        return block.codon;
    }

    const anyUntranslated = mrnaChain.filter(block => !block.translated && block.specialType !== 'HAZARD');
    if (anyUntranslated.length > 0) {
        return anyUntranslated[Math.floor(Math.random() * anyUntranslated.length)].codon;
    }

    // Fallback to active pool
    const activeCodons = getActiveCodons();
    return activeCodons[Math.floor(Math.random() * activeCodons.length)];
}

function spawnNewTRNA() {
    if (gameState !== 'PLAYING') return;
    
    if (translationProgress < targetProtein.sequence.length) {
        if (!currentTRNACodon) {
            currentTRNACodon = selectTargetCodon();
        }
        if (!nextTRNACodon) {
            nextTRNACodon = selectTargetCodon();
        }
        if (!currentTRNACodon) return;
        
        // Guarantee that when tRNA appears on screen, a matching untranslated non-hazard codon exists at x >= 288 (>= 3s window)
        const hasSafeMatchingBlock = mrnaChain.some(
            block => !block.translated && block.specialType !== 'HAZARD' && block.codon === currentTRNACodon && block.x >= MIN_SAFE_TARGET_X
        );
        
        if (!hasSafeMatchingBlock) {
            // Find untranslated non-hazard blocks positioned at x >= MIN_SAFE_TARGET_X
            const safeBlocks = mrnaChain.filter(block => !block.translated && block.specialType !== 'HAZARD' && block.x >= MIN_SAFE_TARGET_X);
            if (safeBlocks.length > 0) {
                const targetBlock = safeBlocks[Math.floor(Math.random() * safeBlocks.length)];
                targetBlock.codon = currentTRNACodon;
            } else {
                // If all blocks at x >= 288 are hazard or translated, convert a block at x >= 288 into a safe matching block
                const anyRightBlocks = mrnaChain.filter(block => !block.translated && block.x >= MIN_SAFE_TARGET_X);
                if (anyRightBlocks.length > 0) {
                    const targetBlock = anyRightBlocks[0];
                    targetBlock.specialType = null;
                    targetBlock.codon = currentTRNACodon;
                } else {
                    const untranslated = mrnaChain.filter(block => !block.translated);
                    if (untranslated.length > 0) {
                        const rightmost = untranslated.reduce((prev, curr) => (curr.x > prev.x ? curr : prev));
                        rightmost.specialType = null;
                        rightmost.codon = currentTRNACodon;
                        if (rightmost.x < MIN_SAFE_TARGET_X) {
                            rightmost.x = MIN_SAFE_TARGET_X;
                        }
                    } else if (mrnaChain.length > 0) {
                        const rightmost = mrnaChain.reduce((prev, curr) => (curr.x > prev.x ? curr : prev));
                        rightmost.translated = false;
                        rightmost.specialType = null;
                        rightmost.codon = currentTRNACodon;
                        rightmost.x = Math.max(rightmost.x, MIN_SAFE_TARGET_X);
                    }
                }
            }
        }
        
        activeTRNA = new TRNA(currentTRNACodon);
        mouseX = activeTRNA.x + tRNAWidth / 2;
        
        // Highlight and scroll to target HUD node for the spawned tRNA
        highlightTargetHUDNode(activeTRNA.aminoAcid, activeTRNA.color);
        
        // Keep preview cards matched
        updatePreviewCards();
    }
}

function updateIntegrityBar() {
    const bar = document.getElementById('integrity-bar');
    const statusText = document.getElementById('integrity-text');
    bar.style.width = `${integrity}%`;
    
    bar.className = 'progress-bar';
    if (integrity > 50) {
        statusText.textContent = "SYSTEMS NOMINAL";
        statusText.className = "status-ok";
    } else if (integrity > 25) {
        statusText.textContent = "WARNING: RIBOSOME UNSTABLE";
        statusText.className = "status-warning";
        bar.classList.add('warning');
    } else {
        statusText.textContent = "CRITICAL: TRANSLATION FAILURE IMMINENT";
        statusText.className = "status-critical";
        bar.classList.add('critical');
    }
}

function triggerGameOver() {
    gameState = 'GAMEOVER';
    isOverdrive = false;
    overdriveTimer = 0;
    cryoTimer = 0;
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    isBraking = false;
    viruses = [];
    updateFeverBar();
    updateBrakeHUD();
    sfx.playGameOver();
    logMsg(`TERMINATED: Integrity failed. Completed ${translationProgress}/${targetProtein.sequence.length} residues.`, 'error');
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-length').textContent = `${translationProgress}/${targetProtein.sequence.length}`;
    
    // Scoreboard entry eligibility check
    const scoreboard = JSON.parse(localStorage.getItem('trado_scoreboard') || '[]');
    const isEligible = !autoModeUsed && !isDemoMode && score > 0;
    
    const inputContainer = document.getElementById('highscore-input-container');
    const boardContainer = document.getElementById('gameover-scoreboard-container');
    
    document.getElementById('player-name-input').value = '';
    
    if (isEligible && (scoreboard.length < 10 || score > (scoreboard[scoreboard.length - 1]?.score || 0))) {
        inputContainer.style.display = 'block';
        boardContainer.style.display = 'none';
    } else {
        inputContainer.style.display = 'none';
        boardContainer.style.display = 'block';
    }
    
    populateScoreboardUI();
    document.getElementById('gameover-overlay').classList.add('active');
}

function triggerMilestone(progress) {
    const bonus = 1000 * level;
    score += bonus;
    document.getElementById('score-val').textContent = String(score).padStart(5, '0');
    
    sfx.playLevelUp(); // Celebrate with a rising note progression
    logMsg(`MILESTONE: Translated ${progress}/${targetProtein.sequence.length} residues! (+${bonus} Pts Bonus)`, 'level');
    
    activeAnnouncement = {
        text: `MILESTONE COMPLETED!`,
        subtext: `${progress} / ${targetProtein.sequence.length} residues translated (+${bonus} pts)`,
        timer: 100,
        maxTimer: 100
    };
    
    // Spawn three large explosion bursts in the center and sides of the screen
    spawnExplosion(canvas.width / 2, canvas.height / 2, '#00f0ff', 40);
    spawnExplosion(canvas.width / 2 - 120, canvas.height / 2, '#ffea00', 25);
    spawnExplosion(canvas.width / 2 + 120, canvas.height / 2, '#2eff5f', 25);
}

function resetIdleTimer() {
    lastInputTime = Date.now();
}

function resetToStartScreen() {
    isAutoMode = false;
    isDemoMode = false;
    isOverdrive = false;
    overdriveTimer = 0;
    cryoTimer = 0;
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    isBraking = false;
    brakeGauge = MAX_BRAKE_GAUGE;
    fever = 0;
    screenShake = 0;
    gameState = 'START';
    updateFeverBar();
    updateBrakeHUD();
    
    // Reset overlays
    document.getElementById('start-overlay').classList.add('active');
    document.getElementById('gameover-overlay').classList.remove('active');
    document.getElementById('levelcomplete-overlay').classList.remove('active');
    
    // Clear entities
    particles = [];
    aminoAcidProjectiles = [];
    floatingTexts = [];
    shockwaves = [];
    viruses = [];
    activeTRNA = null;
    translationProgress = 0;
    
    // Clear preview queue codons
    currentTRNACodon = null;
    nextTRNACodon = null;
    updatePreviewCards();
    
    // Reinitialize starting mRNA chain
    initMRNA();
    
    logMsg("SYSTEMS RESET: Returned to main protocol menu.", "system");
    resetIdleTimer();
}

function populateScoreboardUI() {
    const scoreboard = JSON.parse(localStorage.getItem('trado_scoreboard') || '[]');
    scoreboard.sort((a, b) => b.score - a.score);
    
    const formatScore = (s) => String(s).padStart(5, '0');
    
    const buildListHTML = (listEl) => {
        if (!listEl) return;
        listEl.innerHTML = '';
        if (scoreboard.length === 0) {
            listEl.innerHTML = '<div style="text-align: center; opacity: 0.4; padding: 10px; font-family: monospace; font-size: 0.65rem;">NO RECORDS DETECTED</div>';
            return;
        }
        scoreboard.forEach((entry, index) => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.padding = '3px 0';
            row.style.borderBottom = '1px dashed rgba(255,255,255,0.05)';
            
            const color = index === 0 ? 'var(--yellow)' : index === 1 ? '#00f0ff' : index === 2 ? 'var(--magenta)' : '#fff';
            row.style.color = color;
            
            row.innerHTML = `
                <span style="width: 25px; opacity: 0.6;">#${index + 1}</span>
                <span style="flex-grow: 1; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${entry.name}</span>
                <span style="width: 45px; text-align: center; opacity: 0.6;">LV ${entry.level}</span>
                <span style="width: 60px; text-align: right; font-weight: bold;">${formatScore(entry.score)}</span>
            `;
            listEl.appendChild(row);
        });
    };
    
    buildListHTML(document.getElementById('scoreboard-list'));
    buildListHTML(document.getElementById('gameover-scoreboard-list'));
}

function syncHighScoreDisplay() {
    const scoreboard = JSON.parse(localStorage.getItem('trado_scoreboard') || '[]');
    if (scoreboard.length > 0) {
        scoreboard.sort((a, b) => b.score - a.score);
        highScore = scoreboard[0].score;
    } else {
        highScore = 0;
    }
    const valElement = document.getElementById('highscore-val');
    if (valElement) {
        valElement.textContent = String(highScore).padStart(5, '0');
    }
}

function runAI(dt) {
    if (!activeTRNA) {
        aiTargetBlock = null;
        return;
    }
    
    // Verify target sanity (reset if translated or scrolled off)
    if (aiTargetBlock && (aiTargetBlock.translated || aiTargetBlock.x < -codonWidth)) {
        aiTargetBlock = null;
    }
    
    const expectedAnticodon = activeTRNA.anticodon;
    
    if (!aiTargetBlock) {
        const candidates = mrnaChain.filter(
            block => !block.translated &&
            (block.specialType !== 'HAZARD' || isOverdrive) &&
            getComplementaryCodon(block.codon) === expectedAnticodon
        );
        
        // 15% error rate: intentionally pick a mismatched codon block if rolls true
        if (Math.random() < 0.15 && mrnaChain.length > 0) {
            const mismatchCandidates = mrnaChain.filter(block => !block.translated && getComplementaryCodon(block.codon) !== expectedAnticodon);
            if (mismatchCandidates.length > 0) {
                aiTargetBlock = mismatchCandidates[Math.floor(Math.random() * mismatchCandidates.length)];
            } else {
                aiTargetBlock = mrnaChain[Math.floor(Math.random() * mrnaChain.length)];
            }
        } else if (candidates.length > 0) {
            // Prefer special power-up blocks among valid candidates
            const powerupCandidate = candidates.find(b => b.specialType === 'GOLD' || b.specialType === 'REPAIR' || b.specialType === 'FREEZE');
            aiTargetBlock = powerupCandidate || candidates[0];
        }
    }
    
    if (aiTargetBlock) {
        // Calculate aiming position based on landing time
        const timeToLand = (mRNAY - activeTRNA.y) / fallSpeedDrop;
        const blockTargetCenterX = aiTargetBlock.x + aiTargetBlock.width / 2 - getCurrentMrnaSpeed() * timeToLand;
        
        // Steer tRNA to align centers for Bullseye hits
        const targetTRNAX = blockTargetCenterX - tRNAWidth / 2;
        activeTRNA.targetX = targetTRNAX;
        
        // Trigger quick drop when aligned within Bullseye zone (and no virus is directly in the drop path unless Overdrive is active)
        const trnaCenterX = activeTRNA.x + tRNAWidth / 2;
        const virusInPath = !isOverdrive && viruses.some(v => v.y > activeTRNA.y && Math.abs(v.x - trnaCenterX) < 34);
        if (Math.abs(trnaCenterX - blockTargetCenterX) < 10 && !activeTRNA.quickDropping && !virusInPath) {
            activeTRNA.speedY = fallSpeedDrop;
            activeTRNA.quickDropping = true;
            aiTargetBlock = null; // Reset target
        }
    } else {
        // Safe default position
        activeTRNA.targetX = canvas.width / 2 - tRNAWidth / 2;
    }
}

function triggerLevelComplete() {
    gameState = 'LEVEL_COMPLETE';
    isOverdrive = false;
    overdriveTimer = 0;
    cryoTimer = 0;
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    isBraking = false;
    viruses = [];
    updateFeverBar();
    updateBrakeHUD();
    sfx.playLevelUp();
    
    document.getElementById('completed-protein-name').textContent = targetProtein.name;
    document.getElementById('completed-protein-org').textContent = targetProtein.organism;
    document.getElementById('completed-protein-len').textContent = `${targetProtein.length}/${targetProtein.length}`;
    
    document.getElementById('levelcomplete-overlay').classList.add('active');
    logMsg(`COMPLETED: Synthesized protein: ${targetProtein.name}!`, 'success');
}

function triggerGameVictory() {
    gameState = 'VICTORY';
    isOverdrive = false;
    overdriveTimer = 0;
    cryoTimer = 0;
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    isBraking = false;
    viruses = [];
    updateFeverBar();
    updateBrakeHUD();
    sfx.playLevelUp();
    
    const overTitle = document.querySelector('#gameover-overlay h2');
    const overSubtitle = document.querySelector('#gameover-overlay .subtitle');
    const restartBtn = document.getElementById('restart-btn');
    
    overTitle.textContent = "CONGRATULATIONS!";
    overTitle.style.color = "var(--green)";
    overTitle.style.textShadow = "var(--green-glow)";
    overSubtitle.textContent = "All 20 proteins successfully synthesized!";
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-length').textContent = "20/20 Proteins";
    
    restartBtn.textContent = "Restart Protocol";
    restartBtn.style.borderColor = "var(--green)";
    restartBtn.style.color = "var(--green)";
    
    // Scoreboard entry eligibility check
    const scoreboard = JSON.parse(localStorage.getItem('trado_scoreboard') || '[]');
    const isEligible = !autoModeUsed && !isDemoMode && score > 0;
    
    const inputContainer = document.getElementById('highscore-input-container');
    const boardContainer = document.getElementById('gameover-scoreboard-container');
    
    document.getElementById('player-name-input').value = '';
    
    if (isEligible && (scoreboard.length < 10 || score > (scoreboard[scoreboard.length - 1]?.score || 0))) {
        inputContainer.style.display = 'block';
        boardContainer.style.display = 'none';
    } else {
        inputContainer.style.display = 'none';
        boardContainer.style.display = 'block';
    }
    
    populateScoreboardUI();
    document.getElementById('gameover-overlay').classList.add('active');
}

// 10. GRAPHICS & DRAWING
function varCSS(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function getBaseColor(base) {
    switch(base) {
        case 'A': return varCSS('--color-a') || '#2eff5f';
        case 'U': return varCSS('--color-u') || '#ff3131';
        case 'G': return varCSS('--color-g') || '#00e5ff';
        case 'C': return varCSS('--color-c') || '#ffea00';
        default: return '#fff';
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle tint during Overdrive or Cryo Slow-Mo
    if (isOverdrive) {
        const pulse = 0.04 + 0.03 * Math.sin(Date.now() / 120);
        ctx.fillStyle = `rgba(255, 215, 0, ${pulse})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (cryoTimer > 0) {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.045)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.strokeStyle = isOverdrive ? 'rgba(255, 215, 0, 0.06)' : 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, mRNAY);
    ctx.lineTo(canvas.width, mRNAY);
    ctx.stroke();
}

function drawmRNA() {
    ctx.save();
    
    // Draw rails
    ctx.strokeStyle = cryoTimer > 0 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, mRNAY + 5);
    ctx.lineTo(canvas.width, mRNAY + 5);
    ctx.moveTo(0, mRNAY + codonHeight - 5);
    ctx.lineTo(canvas.width, mRNAY + codonHeight - 5);
    ctx.stroke();
    
    // Draw codons
    mrnaChain.forEach(block => {
        ctx.save();
        
        const w = block.width * block.pulseScale;
        const h = block.height * block.pulseScale;
        const x = block.x + (block.width - w) / 2;
        const y = block.y + (block.height - h) / 2;
        const centerX = x + w / 2;
        
        const isActiveMatch = !block.translated && activeTRNA &&
            block.specialType !== 'HAZARD' &&
            getComplementaryCodon(block.codon) === activeTRNA.anticodon;

        // Styling by state & special modifier
        let badgeText = null;
        let badgeColor = null;

        if (block.translated) {
            ctx.fillStyle = 'rgba(0, 255, 102, 0.05)';
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
            ctx.lineWidth = 2;
        } else if (block.specialType === 'GOLD') {
            ctx.fillStyle = 'rgba(55, 42, 5, 0.85)';
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
            badgeText = '★ x3 AA';
            badgeColor = '#ffd700';
        } else if (block.specialType === 'FREEZE') {
            ctx.fillStyle = 'rgba(5, 38, 55, 0.85)';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
            badgeText = '❄ CRYO';
            badgeColor = '#00f0ff';
        } else if (block.specialType === 'REPAIR') {
            ctx.fillStyle = 'rgba(8, 45, 20, 0.85)';
            ctx.strokeStyle = '#39ff14';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(57, 255, 20, 0.5)';
            badgeText = '✚ +35%';
            badgeColor = '#39ff14';
        } else if (block.specialType === 'HAZARD') {
            ctx.fillStyle = 'rgba(55, 8, 28, 0.88)';
            ctx.strokeStyle = isOverdrive ? '#ffd700' : '#ff007f';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 14;
            ctx.shadowColor = isOverdrive ? 'rgba(255, 215, 0, 0.7)' : 'rgba(255, 0, 127, 0.6)';
            badgeText = isOverdrive ? '⚡ PURIFY' : '☣ MUTANT';
            badgeColor = isOverdrive ? '#ffd700' : '#ff007f';
        } else {
            ctx.fillStyle = 'rgba(10, 15, 35, 0.7)';
            ctx.strokeStyle = (isOverdrive && isActiveMatch) ? '#ffd700' : 'rgba(0, 240, 255, 0.15)';
            ctx.lineWidth = (isOverdrive && isActiveMatch) ? 2.5 : 1;
            if (isOverdrive && isActiveMatch) {
                ctx.shadowBlur = 14;
                ctx.shadowColor = '#ffd700';
            }
        }
        
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 6);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Bullseye center tick marks on untranslated non-hazard blocks
        if (!block.translated && (block.specialType !== 'HAZARD' || isOverdrive)) {
            ctx.strokeStyle = isActiveMatch ? 'rgba(255, 215, 0, 0.55)' : 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(centerX, y + 2);
            ctx.lineTo(centerX, y + 8);
            ctx.moveTo(centerX, y + h - 8);
            ctx.lineTo(centerX, y + h - 2);
            ctx.stroke();
        }

        // Draw special badge pill above block
        if (badgeText && !block.translated) {
            ctx.save();
            ctx.font = 'bold 9px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#04060e';
            ctx.strokeStyle = badgeColor;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(centerX - 34, y - 10, 68, 15, 4);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = badgeColor;
            ctx.fillText(badgeText, centerX, y - 2);
            ctx.restore();
        }
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const bases = block.codon.split('');
        const letterSpacing = 28;
        const startX = x + w / 2 - letterSpacing;
        
        bases.forEach((base, i) => {
            ctx.font = block.translated ? 'normal 13px Orbitron, monospace' : 'bold 18px Orbitron, monospace';
            if (block.translated) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
            } else if (block.specialType === 'HAZARD' && !isOverdrive) {
                ctx.fillStyle = '#ff007f';
            } else {
                ctx.fillStyle = getBaseColor(base);
            }
            const glitchX = (block.specialType === 'HAZARD' && !block.translated && Math.random() < 0.2) ? (Math.random() - 0.5) * 3 : 0;
            ctx.fillText(base, startX + i * letterSpacing + glitchX, y + h / 2 + 2);
        });

        ctx.restore();
    });
    
    ctx.restore();
}

function drawHUDGraphics(dt) {
    ctx.save();
    
    // Draw shockwaves
    shockwaves.forEach((sw, idx) => {
        sw.update(dt);
        sw.draw();
        if (sw.alpha <= 0) {
            shockwaves.splice(idx, 1);
        }
    });

    // Draw floating combat/score popups
    floatingTexts.forEach((ft, idx) => {
        ft.update(dt);
        ft.draw();
        if (ft.alpha <= 0) {
            floatingTexts.splice(idx, 1);
        }
    });

    // Draw projectiles
    aminoAcidProjectiles.forEach((proj, idx) => {
        proj.update(dt);
        proj.draw();
        
        if (proj.progress >= 1) {
            if (!proj.isExtra) {
                fillHUDResidue(proj.aminoAcid, proj.color);
                
                // Check milestone (every 20 residues completed, but not completing the entire level yet)
                const chainList = document.getElementById('chain-container');
                if (chainList) {
                    const completedCount = chainList.querySelectorAll('.aa-node.aa-filled').length;
                    const milestoneSize = 20;
                    const reachedMilestone = Math.floor(completedCount / milestoneSize) * milestoneSize;
                    if (reachedMilestone > lastMilestoneReached && completedCount < targetProtein.sequence.length) {
                        lastMilestoneReached = reachedMilestone;
                        triggerMilestone(reachedMilestone);
                    }
                }
            }
            
            aminoAcidProjectiles.splice(idx, 1);
            
            // Check level complete
            if (translationProgress >= targetProtein.sequence.length && aminoAcidProjectiles.length === 0) {
                triggerLevelComplete();
            }
        }
    });

    // Draw active status banners (Overdrive / Cryo Slow-Mo / Viral Debuffs) at top-left of canvas
    let statusY = 24;
    if (isOverdrive) {
        const secs = (overdriveTimer / 60).toFixed(1);
        ctx.save();
        ctx.font = 'bold 12px Orbitron, monospace';
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffd700';
        ctx.textAlign = 'left';
        ctx.fillText(`⚡ OVERDRIVE ACTIVE: ${secs}s (2x PTS • 3x AA • VIRUS IMMUNE)`, 18, statusY);
        ctx.restore();
        statusY += 20;
    }
    if (cryoTimer > 0) {
        const secs = (cryoTimer / 60).toFixed(1);
        ctx.save();
        ctx.font = 'bold 12px Orbitron, monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.textAlign = 'left';
        ctx.fillText(`❄ CRYO SLOW-MO: ${secs}s`, 18, statusY);
        ctx.restore();
        statusY += 20;
    }
    if (viralSpeedTimer > 0 && !isOverdrive) {
        const secs = (viralSpeedTimer / 60).toFixed(1);
        ctx.save();
        ctx.font = 'bold 12px Orbitron, monospace';
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffd700';
        ctx.textAlign = 'left';
        ctx.fillText(`🦠 YELLOW VIRUS (FAST mRNA): ${secs}s`, 18, statusY);
        ctx.restore();
        statusY += 20;
    }
    if (doubleDamageTimer > 0 && !isOverdrive) {
        const secs = (doubleDamageTimer / 60).toFixed(1);
        ctx.save();
        ctx.font = 'bold 12px Orbitron, monospace';
        ctx.fillStyle = '#ff3131';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff3131';
        ctx.textAlign = 'left';
        ctx.fillText(`🦠 RED VIRUS (2x DAMAGE): ${secs}s`, 18, statusY);
        ctx.restore();
        statusY += 20;
    }

    ctx.restore();
}

// 11. GAME LOOPS
function update(dt) {
    // If on the start menu, check for 30s idle demo trigger
    if (gameState === 'START') {
        if (Date.now() - lastInputTime > 30000) {
            isAutoMode = true;
            isDemoMode = true;
            autoModeUsed = true;
            logMsg("AUTO MODE: Idle timeout. Initializing translation protocol demonstration.", "system");
            
            document.getElementById('start-overlay').classList.remove('active');
            startGame();
        }
    }

    if (gameState === 'PLAYING') {
        if (isAutoMode) {
            runAI(dt);
            autoModeUsed = true;
        }
        const dtScale = dt / 16.667;
        updateMRNA(dt);
        updateViruses(dt);

        if (isOverdrive) {
            overdriveTimer -= dtScale;
            if (overdriveTimer <= 0) {
                isOverdrive = false;
                overdriveTimer = 0;
                fever = 0;
                logMsg("OVERDRIVE ENDED: Ribosome returning to standard translation rate.", "system");
            }
            updateFeverBar();
        }

        if (cryoTimer > 0) {
            cryoTimer = Math.max(0, cryoTimer - dtScale);
        }

        if (viralSpeedTimer > 0) {
            viralSpeedTimer = Math.max(0, viralSpeedTimer - dtScale);
        }

        if (doubleDamageTimer > 0) {
            doubleDamageTimer = Math.max(0, doubleDamageTimer - dtScale);
        }

        if (screenShake > 0) {
            screenShake = Math.max(0, screenShake - 0.8 * dtScale);
        }
        
        if (activeTRNA) {
            activeTRNA.update(dt);
            checkVirusCollisions();
            checkCollision();
        }
        
        particles.forEach((p, idx) => {
            p.update(dt);
            if (p.alpha <= 0) {
                particles.splice(idx, 1);
            }
        });
        
        if (activeAnnouncement) {
            activeAnnouncement.timer -= dtScale;
            if (activeAnnouncement.timer <= 0) {
                activeAnnouncement = null;
            }
        }
    }
}

function draw(dt) {
    ctx.save();
    if (screenShake > 0.5 && gameState === 'PLAYING') {
        const dx = (Math.random() - 0.5) * screenShake;
        const dy = (Math.random() - 0.5) * screenShake;
        ctx.translate(dx, dy);
    }

    drawBackground();
    drawmRNA();
    viruses.forEach(v => v.draw());
    
    if (activeTRNA) {
        activeTRNA.draw();
    }
    
    particles.forEach(p => p.draw());
    drawHUDGraphics(dt);
    ctx.restore();
    
    // Draw announcement overlay if active
    if (activeAnnouncement) {
        ctx.save();
        const t = activeAnnouncement.timer / activeAnnouncement.maxTimer; // 1 to 0
        const alpha = Math.min(1, t * 3); // Fade out at the end
        
        ctx.globalAlpha = alpha;
        
        // Background dark band
        ctx.fillStyle = 'rgba(2, 5, 15, 0.85)';
        ctx.fillRect(0, canvas.height / 2 - 70, canvas.width, 140);
        
        // Glowing cyan lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - 70);
        ctx.lineTo(canvas.width, canvas.height / 2 - 70);
        ctx.moveTo(0, canvas.height / 2 + 70);
        ctx.lineTo(canvas.width, canvas.height / 2 + 70);
        ctx.stroke();
        
        // Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Text shadow
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00f0ff';
        
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 28px Orbitron, monospace';
        ctx.fillText(activeAnnouncement.text, canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffea00';
        ctx.fillStyle = '#ffea00';
        ctx.font = 'bold 15px Orbitron, monospace';
        ctx.fillText(activeAnnouncement.subtext, canvas.width / 2, canvas.height / 2 + 25);
        
        ctx.restore();
    }

    // Draw auto mode banner indicator
    if (isAutoMode) {
        ctx.save();
        const alpha = 0.5 + 0.3 * Math.sin(Date.now() / 250);
        ctx.fillStyle = `rgba(255, 49, 79, ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 49, 79, 0.8)';
        ctx.font = 'bold 11px Orbitron, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(isDemoMode ? "● SYSTEM DEMO ACTIVE (PRESS ANY KEY TO EXIT)" : "● AI ASSIST PROTOCOL ACTIVE", canvas.width - 20, 25);
        ctx.restore();
    }

    // Draw paused overlay
    if (gameState === 'PAUSED') {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f0ff';
        ctx.font = 'bold 32px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
}

let lastTime = 0;
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    
    // Cap dt to prevent massive physics jumps
    if (dt > 100) dt = 100;
    
    update(dt);
    draw(dt);
    
    requestAnimationFrame(gameLoop);
}

// 12. INPUTS
function setupControls() {
    // Global idle reset on any activity
    window.addEventListener('keydown', () => resetIdleTimer());
    window.addEventListener('mousedown', () => resetIdleTimer());
    window.addEventListener('mousemove', () => resetIdleTimer());

    window.addEventListener('keydown', e => {
        // If Escape is pressed, reset to start screen immediately (works in any state!)
        if (e.key === 'Escape') {
            resetToStartScreen();
            e.preventDefault();
            return;
        }

        // Track typed keys buffer for "auto" toggle
        keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-4);
        if (keyBuffer === 'auto') {
            if (gameState === 'PLAYING' || gameState === 'PAUSED') {
                isAutoMode = !isAutoMode;
                aiTargetBlock = null;
                logMsg(`AUTO MODE: AI Assist ${isAutoMode ? 'ENABLED' : 'DISABLED'}.`, isAutoMode ? 'success' : 'system');
                e.preventDefault();
                return;
            }
        }
        
        // If in idle demo mode, any keypress exits back to start screen
        if (isDemoMode) {
            resetToStartScreen();
            e.preventDefault();
            return;
        }
        
        // Toggle pause/unpause
        if (e.key === 'p' || e.key === 'P') {
            if (gameState === 'PLAYING' || gameState === 'PAUSED') {
                togglePause();
                e.preventDefault();
                return;
            }
        }

        // If AI auto mode is active, disable manual movement controls
        if (isAutoMode && gameState === 'PLAYING') return;

        if (gameState !== 'PLAYING' || !activeTRNA) return;
        
        const moveAmount = 25;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            activeTRNA.targetX -= moveAmount;
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            activeTRNA.targetX += moveAmount;
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            isBraking = true;
            updateBrakeHUD();
            e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === ' ') {
            isBraking = false;
            activeTRNA.isSlowBraking = false;
            activeTRNA.speedY = fallSpeedDrop;
            activeTRNA.quickDropping = true;
            updateBrakeHUD();
            e.preventDefault();
        }
    });

    window.addEventListener('keyup', e => {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            isBraking = false;
            updateBrakeHUD();
        }
    });

    window.addEventListener('blur', () => {
        isBraking = false;
        updateBrakeHUD();
    });

    canvas.addEventListener('mousemove', e => {
        if (gameState !== 'PLAYING' || !activeTRNA || isAutoMode || isDemoMode) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        
        mouseX = (e.clientX - rect.left) * scaleX;
        activeTRNA.targetX = mouseX - tRNAWidth / 2;
    });

    canvas.addEventListener('mousedown', e => {
        // If in idle demo mode, clicking exits back to start screen
        if (isDemoMode) {
            resetToStartScreen();
            e.preventDefault();
            return;
        }
        
        if (gameState !== 'PLAYING' || !activeTRNA || isAutoMode) return;
        
        activeTRNA.speedY = fallSpeedDrop;
        activeTRNA.quickDropping = true;
    });

    // UI Buttons
    document.getElementById('start-btn').addEventListener('click', () => {
        sfx.init();
        sfx.startBGM();
        startGame();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        const overTitle = document.querySelector('#gameover-overlay h2');
        const overSubtitle = document.querySelector('#gameover-overlay .subtitle');
        const restartBtn = document.getElementById('restart-btn');
        overTitle.textContent = "TRANSCRIPTION TERMINATED";
        overTitle.style.color = "var(--magenta)";
        overTitle.style.textShadow = "var(--magenta-glow)";
        overSubtitle.textContent = "Ribosome integrity depleted";
        restartBtn.textContent = "Re-Initialize Protocol";
        restartBtn.style.borderColor = "var(--magenta)";
        restartBtn.style.color = "var(--magenta)";
        
        sfx.startBGM();
        startGame();
    });

    document.getElementById('pause-btn').addEventListener('click', togglePause);
    
    // High Score Submission Event
    document.getElementById('submit-score-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('player-name-input');
        let name = nameInput.value.trim().toUpperCase() || 'UNKNOWN';
        name = name.slice(0, 9);
        
        const scoreboard = JSON.parse(localStorage.getItem('trado_scoreboard') || '[]');
        scoreboard.push({
            name: name,
            score: score,
            level: level,
            date: new Date().toLocaleDateString()
        });
        
        scoreboard.sort((a, b) => b.score - a.score);
        scoreboard.splice(10);
        localStorage.setItem('trado_scoreboard', JSON.stringify(scoreboard));
        
        // Refresh ranking and HUD display
        populateScoreboardUI();
        syncHighScoreDisplay();
        
        // Switch overlays
        document.getElementById('highscore-input-container').style.display = 'none';
        document.getElementById('gameover-scoreboard-container').style.display = 'block';
    });
    
    document.getElementById('audio-toggle').addEventListener('click', () => {
        sfx.muted = !sfx.muted;
        document.getElementById('audio-toggle').textContent = sfx.muted ? '🔇 Mute SFX' : '🔊 Mute SFX';
        logMsg(`AUDIO: Sound effects ${sfx.muted ? 'disabled' : 'enabled'}`);
    });

    document.getElementById('bgm-toggle').addEventListener('click', () => {
        sfx.bgmMuted = !sfx.bgmMuted;
        document.getElementById('bgm-toggle').textContent = sfx.bgmMuted ? '🔇 BGM: Off' : '🎵 BGM: On';
        logMsg(`AUDIO: Background music ${sfx.bgmMuted ? 'disabled' : 'enabled'}`);
    });

    document.getElementById('next-level-btn').addEventListener('click', () => {
        document.getElementById('levelcomplete-overlay').classList.remove('active');
        level++;
        if (level > 20) {
            triggerGameVictory();
        } else {
            startLevel();
        }
    });
}

function startGame() {
    score = 0;
    level = 1;
    autoModeUsed = false;
    syncHighScoreDisplay();
    
    // Clear telemetry log box
    const logBox = document.getElementById('telemetry-log');
    if (logBox) logBox.innerHTML = '';
    
    document.getElementById('score-val').textContent = "00000";
    
    document.getElementById('start-overlay').classList.remove('active');
    document.getElementById('gameover-overlay').classList.remove('active');
    document.getElementById('levelcomplete-overlay').classList.remove('active');
    
    startLevel();
}

function startLevel() {
    integrity = 100;
    matchStreak = 0;
    fever = 0;
    isOverdrive = false;
    overdriveTimer = 0;
    cryoTimer = 0;
    viralSpeedTimer = 0;
    doubleDamageTimer = 0;
    brakeGauge = MAX_BRAKE_GAUGE;
    isBraking = false;
    screenShake = 0;
    translationProgress = 0;
    particles = [];
    aminoAcidProjectiles = [];
    floatingTexts = [];
    shockwaves = [];
    viruses = [];
    virusSpawnTimer = 110;
    spawnVirus(true);
    lastMilestoneReached = 0;
    activeAnnouncement = null;
    updateFeverBar();
    updateBrakeHUD();
    
    targetProtein = PROTEINS_LIST[level - 1] || PROTEINS_LIST[0];
    
    // Initialize count maps of needed and translated amino acids
    neededCounts = {};
    translatedCounts = {};
    targetProtein.sequence.split('').forEach(oneLetter => {
        const aa = ONE_TO_THREE[oneLetter] || '???';
        neededCounts[aa] = (neededCounts[aa] || 0) + 1;
        translatedCounts[aa] = 0;
    });

    // Sort required amino acids by frequency, descending
    const aaFrequencies = {};
    targetProtein.sequence.split('').forEach(oneLetter => {
        const aa = ONE_TO_THREE[oneLetter] || '???';
        aaFrequencies[aa] = (aaFrequencies[aa] || 0) + 1;
    });
    sortedAAs = Object.keys(aaFrequencies).sort((a, b) => aaFrequencies[b] - aaFrequencies[a]);

    // Update target HUD details
    document.getElementById('level-val').textContent = level;
    document.getElementById('target-protein-name').textContent = targetProtein.name;
    document.getElementById('target-protein-org').textContent = targetProtein.organism;
    
    updateIntegrityBar();
    initializeProteinHUD();
    
    // Initialize preview queue codons
    currentTRNACodon = selectTargetCodon();
    nextTRNACodon = selectTargetCodon();
    updatePreviewCards();
    
    initMRNA();
    
    gameState = 'PLAYING';
    logMsg(`SYNTHESIS STARTED: Out-of-order translation for ${targetProtein.name} (${targetProtein.length} aa).`, 'level');
    spawnNewTRNA();
}

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        document.getElementById('pause-btn').textContent = 'Resume System';
        logMsg("SYSTEMS PAUSED.");
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        document.getElementById('pause-btn').textContent = 'Pause System';
        logMsg("SYSTEMS RESUMED.");
    }
}

async function loadProteinsList() {
    if (window.location.protocol === 'file:') {
        console.log("Trad-O: Running via file:// protocol. Using embedded proteins database.");
        return;
    }
    
    try {
        const response = await fetch('proteins.json');
        if (response.ok) {
            const list = await response.json();
            if (Array.isArray(list) && list.length > 0) {
                // Validate schema formatting of custom list items
                const isValid = list.every(p => p.name && p.organism && p.sequence && typeof p.length === 'number');
                if (isValid) {
                    // Overwrite the embedded const array in place
                    PROTEINS_LIST.length = 0;
                    list.forEach(p => PROTEINS_LIST.push(p));
                    console.log(`Trad-O: Successfully loaded ${list.length} custom proteins from proteins.json.`);
                } else {
                    console.warn("Trad-O: proteins.json formatting is invalid. Falling back to embedded database.");
                }
            }
        }
    } catch (err) {
        console.log("Trad-O: Could not fetch proteins.json, falling back to embedded database.", err);
    }
}

// 13. INITIALIZATION
window.onload = async () => {
    setupControls();
    
    // Attempt to load external proteins list if running on a server
    await loadProteinsList();
    
    targetProtein = PROTEINS_LIST[0];
    neededCounts = {};
    translatedCounts = {};
    targetProtein.sequence.split('').forEach(oneLetter => {
        const aa = ONE_TO_THREE[oneLetter] || '???';
        neededCounts[aa] = (neededCounts[aa] || 0) + 1;
        translatedCounts[aa] = 0;
    });

    const aaFrequencies = {};
    targetProtein.sequence.split('').forEach(oneLetter => {
        const aa = ONE_TO_THREE[oneLetter] || '???';
        aaFrequencies[aa] = (aaFrequencies[aa] || 0) + 1;
    });
    sortedAAs = Object.keys(aaFrequencies).sort((a, b) => aaFrequencies[b] - aaFrequencies[a]);

    document.getElementById('target-protein-name').textContent = targetProtein.name;
    document.getElementById('target-protein-org').textContent = targetProtein.organism;
    
    currentTRNACodon = selectTargetCodon();
    nextTRNACodon = selectTargetCodon();
    updatePreviewCards();
    populateScoreboardUI();
    syncHighScoreDisplay();
    
    initMRNA();
    
    requestAnimationFrame(gameLoop);
};
