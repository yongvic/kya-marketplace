// components/CtaSection.tsx

"use client";

import React from 'react';

const CtaSection = () => {
    return (
        <div className="relative">
            {/* 
              MODIFIÉ: Ce composant est maintenant juste une forme décorative.
              - 'z-5' s'assure qu'il est au-dessus du contenu suivant, mais EN DESSOUS du bouton (qui est en z-20).
              - Le contenu a été retiré, nous utilisons une hauteur fixe pour la vague.
            */}
            <div className="relative z-5 bg-kya-green -mt-32 h-64 rounded-t-[100%]" />
        </div>
    );
};

export default CtaSection;