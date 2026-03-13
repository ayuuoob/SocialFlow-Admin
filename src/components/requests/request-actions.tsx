'use client';

import { useState } from 'react';
import { Request, User } from '@/lib/mock-data';
import { Button, Badge } from '@/components/ui/components';
import { Modal } from '@/components/ui/modal';
import { Check, X, AlertTriangle, AlertCircle } from 'lucide-react';

interface RequestActionsProps {
    request: Request;
    user: User | undefined;
    onStatusChange: (status: string) => void;
}

export function RequestActions({ request, user, onStatusChange }: RequestActionsProps) {
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const [acceptConfirmed, setAcceptConfirmed] = useState(false); // Checkbox state

    if (!user) return null;

    const isRisky = user.score < 40;

    const handleAccept = () => {
        onStatusChange('Acceptée');
        setShowAcceptModal(false);
    }

    // Reset checkbox when modal opens
    const openAcceptModal = () => {
        setAcceptConfirmed(false);
        setShowAcceptModal(true);
    }

    return (
        <div className="flex gap-2">
            {request.status === 'En attente' && (
                <>
                    <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={openAcceptModal}>
                        <Check className="mr-2 h-4 w-4" />
                        Accepter
                    </Button>
                    <Button variant="destructive" onClick={() => setShowRefuseModal(true)}>
                        <X className="mr-2 h-4 w-4" />
                        Refuser
                    </Button>
                </>
            )}

            {/* Accept Modal */}
            <Modal
                isOpen={showAcceptModal}
                onClose={() => setShowAcceptModal(false)}
                title="Valider la demande"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setShowAcceptModal(false)}>Annuler</Button>
                        <Button
                            variant="default"
                            className={isRisky ? "bg-orange-500 hover:bg-orange-600" : "bg-green-600 hover:bg-green-700"}
                            disabled={isRisky && !acceptConfirmed}
                            onClick={handleAccept}
                        >
                            Confirmer & Payer
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Utilisateur</span>
                            <span className="font-medium">{user.firstName} {user.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Type</span>
                            <span className="font-medium">{request.type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Montant</span>
                            <span className="font-medium text-lg">{request.amount} DH</span>
                        </div>
                    </div>

                    {/* RISK WARNING */}
                    <div className={`p-4 rounded-lg border flex gap-3 ${isRisky ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                        {isRisky ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <Check className="h-5 w-5 shrink-0" />}
                        <div className="space-y-1">
                            <p className="font-bold text-sm">
                                {isRisky ? "Attention : Utilisateur à Risque" : "Profil Fiable"}
                            </p>
                            <p className="text-sm">
                                {isRisky
                                    ? `Le score de cet utilisateur est de ${user.score}/100, ce qui est inférieur au seuil de sécurité (40/100).`
                                    : `Le score de cet utilisateur est de ${user.score}/100. Pas de risque détecté.`}
                            </p>
                        </div>
                    </div>

                    {/* CONFIRMATION CHECKBOX FOR RISK */}
                    {isRisky && (
                        <div className="flex items-start gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="confirm-risk"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={acceptConfirmed}
                                onChange={(e) => setAcceptConfirmed(e.target.checked)}
                            />
                            <label htmlFor="confirm-risk" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                                Je confirme avoir pris connaissance du risque et souhaite valider cette avance exceptionnellement.
                            </label>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Refuse Modal */}
            <Modal
                isOpen={showRefuseModal}
                onClose={() => setShowRefuseModal(false)}
                title="Refuser la demande"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setShowRefuseModal(false)}>Annuler</Button>
                        <Button variant="destructive" onClick={() => { onStatusChange('Refusée'); setShowRefuseModal(false); }}>
                            Confirmer le refus
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p>Voulez-vous vraiment refuser cette demande ?</p>
                    <div>
                        <label className="block text-sm font-medium mb-1">Motif du refus</label>
                        <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]" placeholder="Ex: Documents manquants..." />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
