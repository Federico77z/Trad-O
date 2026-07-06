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
    return codon.split('').map(getComplementaryBase).join('');
}

function getCodonInfo(codon) {
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
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
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
}

const sfx = new SoundSynth();

// 4. GAME STATE VARIABLES
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let highScore = parseInt(localStorage.getItem('trado_highscore') || '0', 10);
let level = 1;
let integrity = 100;
let gameState = 'START';
const mrnaSpeed = 1.6; // Constant scrolling speed
let matchStreak = 0;

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
let lastInputTime = Date.now();
let keyBuffer = '';
let aiTargetBlock = null;

// Entities
let mrnaChain = [];
let activeTRNA = null;
let particles = [];
let aminoAcidProjectiles = [];

// Config
const mRNAY = 500;
const codonWidth = 120;
const codonHeight = 60;
const tRNAWidth = 80;
const tRNAHeight = 85;
const fallSpeedNormal = 2.0;
const fallSpeedDrop = 15.0;

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
    return active;
}

function initMRNA() {
    mrnaChain = [];
    const count = Math.ceil(canvas.width / codonWidth) + 3;
    for (let i = 0; i < count; i++) {
        mrnaChain.push(spawnCodonBlock(i * codonWidth));
    }
}

function spawnCodonBlock(xPosition) {
    const activeCodons = getActiveCodons();
    const randomCodon = activeCodons[Math.floor(Math.random() * activeCodons.length)];
    return {
        x: xPosition,
        y: mRNAY,
        width: codonWidth,
        height: codonHeight,
        codon: randomCodon,
        translated: false,
        pulseScale: 1.0,
        successGlow: 0
    };
}

function updateMRNA(dt) {
    const dtScale = dt / 16.667;
    mrnaChain.forEach(block => {
        block.x -= mrnaSpeed * dtScale;
        
        // Highlight corresponding row in Reference Table
        if (block.x < canvas.width / 2 && block.x + block.width > canvas.width / 2 && !block.translated) {
            updateReferenceHighlight(block.codon);
        }

        if (block.successGlow > 0) {
            block.successGlow -= 0.05 * dtScale;
            block.pulseScale = 1.0 + Math.sin(block.successGlow * Math.PI) * 0.15;
        }
    });

    // Scroll block off-screen left and spawn new block right
    if (mrnaChain[0] && mrnaChain[0].x < -codonWidth) {
        mrnaChain.shift();
        const lastBlockX = mrnaChain[mrnaChain.length - 1].x;
        mrnaChain.push(spawnCodonBlock(lastBlockX + codonWidth));
    }
}

// Highlight Reference Table row
let currentHighlightedCodon = null;
function updateReferenceHighlight(codon) {
    if (currentHighlightedCodon === codon) return;
    
    document.querySelectorAll('.reference-table tbody tr').forEach(row => {
        if (row.getAttribute('data-codon') === codon) {
            row.classList.add('active-target');
        } else {
            row.classList.remove('active-target');
        }
    });
    currentHighlightedCodon = codon;
}

// Dynamic Reference Table (shows only codons of remaining needed residues)
let lastActiveCount = 0;
function checkAndRefreshReferenceTable() {
    const activeCodons = getActiveCodons();
    if (activeCodons.length === lastActiveCount) return;
    
    lastActiveCount = activeCodons.length;
    
    const tbody = document.querySelector('.reference-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const uniqueCodons = Array.from(new Set(activeCodons));
    
    uniqueCodons.forEach(codon => {
        const info = getCodonInfo(codon);
        const tr = document.createElement('tr');
        tr.setAttribute('data-codon', codon);
        
        const tdAnticodon = document.createElement('td');
        tdAnticodon.innerHTML = formatCodonHTML(info.anticodon);
        
        const tdCodon = document.createElement('td');
        tdCodon.innerHTML = formatCodonHTML(codon);
        
        const tdAA = document.createElement('td');
        tdAA.innerHTML = formatAminoAcidHTML(info.aminoAcid);
        
        tr.appendChild(tdAnticodon);
        tr.appendChild(tdCodon);
        tr.appendChild(tdAA);
        
        tbody.appendChild(tr);
    });
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
        
        this.speedY = fallSpeedNormal;
        this.quickDropping = false;
        this.targetX = this.x;
        this.glowPhase = 0;
        
        sfx.playSpawn();
    }

    update(dt) {
        const dtScale = dt / 16.667;
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
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        // 1. Cargo ball
        const cargoRadius = 15;
        const cargoX = this.x + this.width / 2;
        const cargoY = this.y + cargoRadius + 5;
        
        const grad = ctx.createRadialGradient(cargoX - 4, cargoY - 4, 2, cargoX, cargoY, cargoRadius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, this.color);
        grad.addColorStop(1, '#02050f');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cargoX, cargoY, cargoRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.aminoAcid, cargoX, cargoY);
        
        // 2. Body Cloverleaf
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
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

        if (this.quickDropping) {
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

class AAProjectile {
    constructor(startX, startY, endX, endY, aminoAcid, color) {
        this.x = startX;
        this.y = startY;
        this.endX = endX;
        this.endY = endY;
        this.aminoAcid = aminoAcid;
        this.color = color;
        this.progress = 0;
        this.speed = 0.04;
        
        this.ctrlX = startX + (endX - startX) / 2 + (Math.random() - 0.5) * 50;
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

// 9. GAME ENGINE COLLISION & MATCH LOGIC
function handleMatchSuccess(block, matchedTRNA) {
    block.translated = true;
    block.successGlow = 1.0;
    
    matchStreak++;
    const pointsAwarded = 100 * level * matchStreak;
    score += pointsAwarded;
    document.getElementById('score-val').textContent = String(score).padStart(5, '0');
    
    integrity = Math.min(100, integrity + 5);
    updateIntegrityBar();

    const aa = matchedTRNA.aminoAcid;
    const color = matchedTRNA.color;
    
    // Increment progress counts
    translationProgress++;
    translatedCounts[aa] = (translatedCounts[aa] || 0) + 1;
    
    logMsg(`MATCH: paired tRNA (${matchedTRNA.anticodon}) with Codon (${block.codon}). Added ${aa} to protein! (+${pointsAwarded} pts)`, 'success');
    sfx.playMatch();
    
    // Spawn projectile flying up to top edge
    aminoAcidProjectiles.push(new AAProjectile(
        matchedTRNA.x + tRNAWidth/2,
        matchedTRNA.y + 15,
        matchedTRNA.x + tRNAWidth/2, // Fly straight up
        0, // Top of canvas
        aa,
        color
    ));
    
    spawnExplosion(matchedTRNA.x + tRNAWidth/2, matchedTRNA.y + 15, color, 25);
    
    activeTRNA = null;
    
    // Spawn next tRNA if protein is not complete yet
    if (translationProgress < targetProtein.sequence.length) {
        setTimeout(spawnNewTRNA, 500);
    }
}

function handleMatchFailure(block, matchedTRNA) {
    matchStreak = 0;
    const penalty = 20;
    integrity = Math.max(0, integrity - penalty);
    updateIntegrityBar();
    
    sfx.playMismatch();
    
    if (block) {
        logMsg(`MISMATCH: tRNA (${matchedTRNA.anticodon}) mismatched codon (${block.codon})! Ribosome damaged (-${penalty}%)`, 'error');
        spawnExplosion(matchedTRNA.x + tRNAWidth/2, matchedTRNA.y + 50, '#ff007f', 30);
    } else {
        logMsg(`MISS: tRNA fell out of target bounds! Ribosome damaged (-${penalty}%)`, 'error');
        spawnExplosion(matchedTRNA.x + tRNAWidth/2, matchedTRNA.y + 50, '#ff0000', 15);
    }
    
    activeTRNA = null;
    
    if (integrity <= 0) {
        triggerGameOver();
    } else {
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

function selectTargetCodon() {
    const dist = mRNAY - (-tRNAHeight); // 585px
    const t_normal = dist / fallSpeedNormal;
    const t_quick = dist / fallSpeedDrop;

    // Filter untranslated mRNA blocks that are reachable
    const reachableBlocks = mrnaChain.filter(block => {
        if (block.translated) return false;
        const maxBlockX = canvas.width + t_quick * mrnaSpeed;
        const minBlockX = t_normal * mrnaSpeed - block.width;
        return block.x >= minBlockX && block.x <= maxBlockX;
    });

    if (reachableBlocks.length > 0) {
        const block = reachableBlocks[Math.floor(Math.random() * reachableBlocks.length)];
        return block.codon;
    }

    const minBlockX = t_normal * mrnaSpeed - codonWidth;
    const upcoming = mrnaChain.filter(block => !block.translated && block.x >= minBlockX);
    if (upcoming.length > 0) {
        return upcoming[0].codon;
    }

    const anyUntranslated = mrnaChain.filter(block => !block.translated);
    if (anyUntranslated.length > 0) {
        return anyUntranslated[0].codon;
    }

    // Fallback to active pool
    const activeCodons = getActiveCodons();
    return activeCodons[Math.floor(Math.random() * activeCodons.length)];
}

function spawnNewTRNA() {
    if (gameState !== 'PLAYING') return;
    
    if (translationProgress < targetProtein.sequence.length) {
        const targetCodon = selectTargetCodon();
        activeTRNA = new TRNA(targetCodon);
        mouseX = activeTRNA.x + tRNAWidth / 2;
        
        // Highlight and scroll to target HUD node for the spawned tRNA
        highlightTargetHUDNode(activeTRNA.aminoAcid, activeTRNA.color);
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
    sfx.playGameOver();
    logMsg(`TERMINATED: Integrity failed. Completed ${translationProgress}/${targetProtein.sequence.length} residues.`, 'error');
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('trado_highscore', highScore);
        document.getElementById('highscore-val').textContent = String(highScore).padStart(5, '0');
    }
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-length').textContent = `${translationProgress}/${targetProtein.sequence.length}`;
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

function exitDemoMode() {
    isAutoMode = false;
    isDemoMode = false;
    gameState = 'START';
    
    // Reset overlays
    document.getElementById('start-overlay').classList.add('active');
    document.getElementById('gameover-overlay').classList.remove('active');
    document.getElementById('levelcomplete-overlay').classList.remove('active');
    
    // Clear entities
    particles = [];
    aminoAcidProjectiles = [];
    activeTRNA = null;
    translationProgress = 0;
    
    // Reinitialize starting mRNA chain
    initMRNA();
    
    logMsg("AUTO MODE: Demonstration terminated. Returning to start menu.", "system");
    resetIdleTimer();
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
        const candidates = mrnaChain.filter(block => !block.translated && getComplementaryCodon(block.codon) === expectedAnticodon);
        
        // 15% error rate: intentionally pick a mismatched codon block if rolls true
        if (Math.random() < 0.15 && mrnaChain.length > 0) {
            const mismatchCandidates = mrnaChain.filter(block => !block.translated && getComplementaryCodon(block.codon) !== expectedAnticodon);
            if (mismatchCandidates.length > 0) {
                aiTargetBlock = mismatchCandidates[Math.floor(Math.random() * mismatchCandidates.length)];
            } else {
                aiTargetBlock = mrnaChain[Math.floor(Math.random() * mrnaChain.length)];
            }
        } else if (candidates.length > 0) {
            aiTargetBlock = candidates[0];
        }
    }
    
    if (aiTargetBlock) {
        // Calculate aiming position based on landing time
        const timeToLand = (mRNAY - activeTRNA.y) / fallSpeedDrop;
        const blockTargetCenterX = aiTargetBlock.x + aiTargetBlock.width / 2 - mrnaSpeed * timeToLand;
        
        // Steer tRNA to align centers
        const targetTRNAX = blockTargetCenterX - tRNAWidth / 2;
        activeTRNA.targetX = targetTRNAX;
        
        // Trigger quick drop when aligned
        const trnaCenterX = activeTRNA.x + tRNAWidth / 2;
        if (Math.abs(trnaCenterX - blockTargetCenterX) < 12 && !activeTRNA.quickDropping) {
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
    sfx.playLevelUp();
    
    document.getElementById('completed-protein-name').textContent = targetProtein.name;
    document.getElementById('completed-protein-org').textContent = targetProtein.organism;
    document.getElementById('completed-protein-len').textContent = `${targetProtein.length}/${targetProtein.length}`;
    
    document.getElementById('levelcomplete-overlay').classList.add('active');
    logMsg(`COMPLETED: Synthesized protein: ${targetProtein.name}!`, 'success');
}

function triggerGameVictory() {
    gameState = 'VICTORY';
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
    
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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
        
        if (block.translated) {
            ctx.fillStyle = 'rgba(0, 255, 102, 0.05)';
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
        } else {
            ctx.fillStyle = 'rgba(10, 15, 35, 0.7)';
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
        }
        
        ctx.lineWidth = block.translated ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const bases = block.codon.split('');
        const letterSpacing = 28;
        const startX = x + w / 2 - letterSpacing;
        
        bases.forEach((base, i) => {
            ctx.font = block.translated ? 'normal 13px Orbitron, monospace' : 'bold 18px Orbitron, monospace';
            ctx.fillStyle = block.translated ? 'rgba(255,255,255,0.2)' : getBaseColor(base);
            ctx.fillText(base, startX + i * letterSpacing, y + h / 2);
        });

        ctx.restore();
    });
    
    ctx.restore();
}

function drawHUDGraphics(dt) {
    ctx.save();
    
    // Draw projectiles
    aminoAcidProjectiles.forEach((proj, idx) => {
        proj.update(dt);
        proj.draw();
        
        if (proj.progress >= 1) {
            fillHUDResidue(proj.aminoAcid, proj.color);
            
            // Check milestone (every 20 residues completed, but not completing the entire level yet)
            const chainList = document.getElementById('chain-container');
            if (chainList) {
                const completedCount = chainList.querySelectorAll('.aa-node.aa-filled').length;
                const milestoneSize = 20;
                if (completedCount > 0 && completedCount % milestoneSize === 0 && completedCount < targetProtein.sequence.length) {
                    if (completedCount > lastMilestoneReached) {
                        lastMilestoneReached = completedCount;
                        triggerMilestone(completedCount);
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

    ctx.restore();
}

// 11. GAME LOOPS
function update(dt) {
    // If on the start menu, check for 30s idle demo trigger
    if (gameState === 'START') {
        if (Date.now() - lastInputTime > 30000) {
            isAutoMode = true;
            isDemoMode = true;
            logMsg("AUTO MODE: Idle timeout. Initializing translation protocol demonstration.", "system");
            
            document.getElementById('start-overlay').classList.remove('active');
            startGame();
        }
    }

    if (gameState === 'PLAYING') {
        if (isAutoMode) {
            runAI(dt);
        }
        const dtScale = dt / 16.667;
        updateMRNA(dt);
        checkAndRefreshReferenceTable(); // Refresh table dynamically on remaining targets
        
        if (activeTRNA) {
            activeTRNA.update(dt);
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
    drawBackground();
    drawmRNA();
    
    if (activeTRNA) {
        activeTRNA.draw();
    }
    
    particles.forEach(p => p.draw());
    drawHUDGraphics(dt);
    
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
            exitDemoMode();
            e.preventDefault();
            return;
        }
        
        // If AI auto mode is active while playing, disable manual playing controls
        if (isAutoMode && gameState === 'PLAYING') {
            if (e.key === 'p' || e.key === 'P') {
                togglePause();
            }
            return;
        }

        if (gameState !== 'PLAYING' || !activeTRNA) return;
        
        const moveAmount = 25;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            activeTRNA.targetX -= moveAmount;
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            activeTRNA.targetX += moveAmount;
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === ' ') {
            activeTRNA.speedY = fallSpeedDrop;
            activeTRNA.quickDropping = true;
            e.preventDefault();
        } else if (e.key === 'p' || e.key === 'P') {
            togglePause();
        }
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
            exitDemoMode();
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
        
        startGame();
    });

    document.getElementById('pause-btn').addEventListener('click', togglePause);
    
    document.getElementById('audio-toggle').addEventListener('click', () => {
        sfx.muted = !sfx.muted;
        document.getElementById('audio-toggle').textContent = sfx.muted ? '🔇 Unmute Audio' : '🔊 Mute Audio';
        logMsg(`AUDIO: Sound effects ${sfx.muted ? 'disabled' : 'enabled'}`);
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
    highScore = parseInt(localStorage.getItem('trado_highscore') || '0', 10);
    
    document.getElementById('score-val').textContent = "00000";
    document.getElementById('highscore-val').textContent = String(highScore).padStart(5, '0');
    
    document.getElementById('start-overlay').classList.remove('active');
    document.getElementById('gameover-overlay').classList.remove('active');
    document.getElementById('levelcomplete-overlay').classList.remove('active');
    
    startLevel();
}

function startLevel() {
    integrity = 100;
    matchStreak = 0;
    translationProgress = 0;
    particles = [];
    aminoAcidProjectiles = [];
    lastMilestoneReached = 0;
    activeAnnouncement = null;
    
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
    
    // Reset reference table tracker and rebuild table
    lastActiveCount = 0;
    checkAndRefreshReferenceTable();
    
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

// 13. INITIALIZATION
window.onload = () => {
    setupControls();
    
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
    
    checkAndRefreshReferenceTable();
    initMRNA();
    
    requestAnimationFrame(gameLoop);
};
