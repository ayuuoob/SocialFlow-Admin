import { addDays, subDays } from 'date-fns';

export type ScoreLevel = 'Faible' | 'Moyen' | 'Elevé';

export type ScoreEvent = {
    date: string;
    score: number;
    delta: number;
    reason: string;
};

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    cin: string;
    cnssNumber: string;
    score: number;
    scoreLevel: ScoreLevel;
    email: string;
    phone: string;
    scoreHistory: ScoreEvent[];
};

export type RequestType = 'Décès' | 'Obsèques' | 'Remboursement CNSS' | 'Micro-crédit' | 'Avance salaire';
export type RequestStatus = 'En attente' | 'Acceptée' | 'Refusée' | 'En cours CNSS' | 'Clôturée';

export type Request = {
    id: string;
    userId: string;
    type: RequestType;
    amount: number;
    date: string;
    status: RequestStatus;
    description: string;
    user?: User; // Joined for convenience
};

export type Transaction = {
    id: string;
    requestId: string;
    userId: string;
    type: 'Avance' | 'Remboursement';
    amount: number;
    date: string;
    status: 'Simulée' | 'Confirmée';
};

// --- MOCK DATA ---

const scoreHistorySample: ScoreEvent[] = [
    { date: subDays(new Date(), 90).toISOString(), score: 65, delta: 0, reason: "Score initial" },
    { date: subDays(new Date(), 60).toISOString(), score: 70, delta: +5, reason: "Profil complété" },
    { date: subDays(new Date(), 30).toISOString(), score: 60, delta: -10, reason: "Retard simple échéance" },
    { date: subDays(new Date(), 5).toISOString(), score: 65, delta: +5, reason: "Régularisation" },
];

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        firstName: 'Ahmed',
        lastName: 'Benali',
        cin: 'AB123456',
        cnssNumber: 'CNSS-987654',
        email: 'ahmed.benali@example.com',
        phone: '0661123456',
        score: 85,
        scoreLevel: 'Elevé',
        scoreHistory: [
            { date: subDays(new Date(), 100).toISOString(), score: 60, delta: 0, reason: "Ouverture compte" },
            { date: subDays(new Date(), 50).toISOString(), score: 75, delta: +15, reason: "Remboursements à temps" },
            { date: subDays(new Date(), 10).toISOString(), score: 85, delta: +10, reason: "Ancienneté" },
        ]
    },
    {
        id: 'u2',
        firstName: 'Sara',
        lastName: 'El Idrissi',
        cin: 'CD654321',
        cnssNumber: 'CNSS-123456',
        email: 'sara.idrissi@example.com',
        phone: '0662987654',
        score: 35,
        scoreLevel: 'Faible',
        scoreHistory: [
            { date: subDays(new Date(), 60).toISOString(), score: 50, delta: 0, reason: "Score initial" },
            { date: subDays(new Date(), 15).toISOString(), score: 35, delta: -15, reason: "Incident de paiement récent" },
        ]
    },
    {
        id: 'u3',
        firstName: 'Karim',
        lastName: 'Tazi',
        cin: 'EF112233',
        cnssNumber: 'CNSS-554433',
        email: 'karim.tazi@example.com',
        phone: '0655443322',
        score: 62,
        scoreLevel: 'Moyen',
        scoreHistory: scoreHistorySample
    },
    {
        id: 'u4',
        firstName: 'Fatima',
        lastName: 'Zahra',
        cin: 'GH445566',
        cnssNumber: 'CNSS-776655',
        email: 'fatima.zahra@example.com',
        phone: '0677889900',
        score: 92,
        scoreLevel: 'Elevé',
        scoreHistory: [
            { date: subDays(new Date(), 200).toISOString(), score: 70, delta: 0, reason: "Initial" },
            { date: subDays(new Date(), 100).toISOString(), score: 85, delta: +15, reason: "Epargne régulière" },
            { date: subDays(new Date(), 20).toISOString(), score: 92, delta: +7, reason: "Aucun incident" }
        ]
    }
];

export const MOCK_REQUESTS: Request[] = [
    {
        id: 'req-101',
        userId: 'u1',
        type: 'Avance salaire',
        amount: 3000,
        date: subDays(new Date(), 2).toISOString(),
        status: 'En attente',
        description: 'Avance sur salaire du mois de Mars',
    },
    {
        id: 'req-102',
        userId: 'u2',
        type: 'Décès',
        amount: 10000,
        date: subDays(new Date(), 5).toISOString(),
        status: 'En cours CNSS',
        description: 'Dossier complet, en attente retour CNSS',
    },
    {
        id: 'req-103',
        userId: 'u3',
        type: 'Remboursement CNSS',
        amount: 450,
        date: subDays(new Date(), 1).toISOString(),
        status: 'Refusée',
        description: 'Manque pièce justificative',
    },
    {
        id: 'req-104',
        userId: 'u4',
        type: 'Obsèques',
        amount: 5000,
        date: new Date().toISOString(),
        status: 'En attente',
        description: 'Demande urgente'
    },
    {
        id: 'req-105',
        userId: 'u2',
        type: 'Micro-crédit',
        amount: 1500,
        date: subDays(new Date(), 10).toISOString(),
        status: 'Acceptée',
        description: 'Achat équipement ménager'
    }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'tx-001', requestId: 'req-105', userId: 'u2', type: 'Avance', amount: 1500, date: subDays(new Date(), 10).toISOString(), status: 'Confirmée' }
];
