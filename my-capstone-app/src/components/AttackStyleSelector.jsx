import React, { useContext, useEffect, useState } from "react";
import { GearContext } from "@/context/GearContext"; // Context for accessing equipped gear
import AttackStyleCard from "./AttackStyleCard"; // UI card for selecting an attack style
import SpellSelector from "./SpellSelector"; // Spell dropdown component (for magic)
import AmmoSelector from "./AmmoSelector"; // Ammo (dart) dropdown component (for blowpipe)

// Main component for selecting attack style, spell (if magic), and ammo (if blowpipe)
function AttackStyleSelector({ onStyleChange, activeStyle, selectedSpellName, selectedAmmoName }) {
    const { gear } = useContext(GearContext);
    const weaponStyles = gear.weapon?.weapon?.stances || []; // Array of possible attack styles
    const weaponType = gear.weapon?.weapon?.weapon_type || ""; // Weapon type (e.g. "stab_sword", "staff")

    // State to track selected attack style, spell, and ammo
    const [selectedStyle, setSelectedStyle] = useState(activeStyle || null);
    const [selectedSpell, setSelectedSpell] = useState(selectedSpellName || null);
    const [selectedAmmo, setSelectedAmmo] = useState(selectedAmmoName || null);

    // Auto-select default style on mount or when weapon changes
    useEffect(() => {
        if (activeStyle) {
            setSelectedStyle(activeStyle);
        } else if (weaponStyles.length > 0) {
            const aggressive = weaponStyles.find((style) => style.attack_style === "aggressive");
            const defaultStyle = aggressive || weaponStyles[0]; // Prefer aggressive style if available for default
            setSelectedStyle(defaultStyle);
            onStyleChange?.(defaultStyle, selectedSpell); // Notify parent of selection
        }
    }, [activeStyle, weaponStyles]);

    // Update local spell state when parent prop changes
    useEffect(() => {
        if (selectedSpellName) {
            setSelectedSpell(selectedSpellName);
        }
    }, [selectedSpellName]);

    // Update local ammo state when parent prop changes
    useEffect(() => {
        if (selectedAmmoName) {
            setSelectedAmmo(selectedAmmoName);
        }
    }, [selectedAmmoName]);

    // Reset spell and ammo when weapon changes (gear.weapon._id changes)
    useEffect(() => {
        setSelectedSpell(null);
        setSelectedAmmo(null);
        onStyleChange?.(selectedStyle, null, null);
    }, [gear.weapon?._id]);

    // Handle attack style change
    function handleStyleChange(style) {
        setSelectedStyle(style);

        const isMagic = style?.attack_type === "magic";
        const newSpell = isMagic ? selectedSpell : null; // Keep spell if still magic

        if (!isMagic) setSelectedSpell(null); // Clear spell if switching away from magic

        onStyleChange?.(style, newSpell);
    }

    // Handle spell selection (from SpellSelector)
    function handleSpellSelect(spell) {
        setSelectedSpell(spell);
        onStyleChange?.(selectedStyle, spell);
    }

    // Helper to check if a style is magic-based
    function isMagicStyle(style) {
        return style?.attack_style === "magic";
    }

    const isMagic = isMagicStyle(selectedStyle); // Determine if current style is magic

    // Check if equipped weapon is a toxic blowpipe variant
    function isBlowpipe(_id) {
        return _id === 12926 || _id === 28688 || _id === 30374;
    }

    const isToxicBlowpipe = isBlowpipe(gear.weapon?._id);

    // Handle ammo (dart) selection from AmmoSelector
    function handleAmmoSelect(dart) {
        setSelectedAmmo(dart);
        setSelectedSpell(null); // Clear spell when using blowpipe
        onStyleChange?.(selectedStyle, null, dart);
    }

    return (
        <>
            {/* Render a card for each available attack style */}
            {weaponStyles.map((style, index) => (
                <AttackStyleCard
                    key={index}
                    styles={style}
                    weaponType={weaponType}
                    selected={style === selectedStyle}
                    onSelect={() => handleStyleChange(style)}
                />
            ))}

            {/* Show spell selector if current style is magic */}
            {isMagic && <SpellSelector selectedSpellName={selectedSpell} onSpellSelect={handleSpellSelect} />}

            {/* Show ammo selector if using a toxic blowpipe */}
            {isToxicBlowpipe && <AmmoSelector selectedAmmoName={selectedAmmo} onAmmoSelect={handleAmmoSelect} />}
        </>
    );
}

export default AttackStyleSelector;
