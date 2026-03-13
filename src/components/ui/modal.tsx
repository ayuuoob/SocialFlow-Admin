'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string; // Content override
}

export function Modal({ isOpen, onClose, title, children, footer, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm animate-in fade-in duration-200">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className={cn("relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200", className)}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="mb-6">{children}</div>
                {footer && <div className="flex justify-end gap-2">{footer}</div>}
            </div>
        </div>
    );
}

interface SlideOverProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition duration-500 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 bg-background shadow-xl animate-in slide-in-from-right duration-300">
                    <div className="flex h-full flex-col overflow-y-scroll bg-background py-6 shadow-xl">
                        <div className="px-4 sm:px-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold leading-6 text-foreground">{title}</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, variant = 'primary' }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: React.ReactNode; variant?: 'primary' | 'destructive' | 'warning' }) => {
    const buttonVariant = variant === 'primary' || variant === 'warning' ? 'default' : variant;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button variant={buttonVariant} className={variant === 'warning' ? 'bg-orange-500 hover:bg-orange-600' : ''} onClick={() => { onConfirm(); onClose(); }}>
                        Confirmer
                    </Button>
                </>
            }
        >
            <div className="text-sm text-muted-foreground">
                {message}
            </div>
        </Modal>
    )
}
