import React, { useContext, useEffect, useState } from "react";
import { GearContext } from "@/context/GearContext";
import AttackStyleCard from "./AttackStyleCard";
import SpellSelector from "./SpellSelector";
import AmmoSelector from "./AmmoSelector";

function AttackStyleSelector({ onStyleChange, activeStyle, selectedSpellName, selectedAmmoName }) {
    const { gear } = useContext(GearContext);
    const weaponStyles = gear.weapon?.weapon?.stances || [];
    const weaponType = gear.weapon?.weapon?.weapon_type || "";

    const [selectedStyle, setSelectedStyle] = useState(activeStyle || null);
    const [selectedSpell, setSelectedSpell] = useState(selectedSpellName || null);
    const [selectedAmmo, setSelectedAmmo] = useState(selectedAmmoName || null);

    useEffect(() => {
        if (activeStyle) {
            setSelectedStyle(activeStyle);
        } else if (weaponStyles.length > 0) {
            const aggressive = weaponStyles.find((style) => style.attack_style === "aggressive");
            const defaultStyle = aggressive || weaponStyles[0];
            setSelectedStyle(defaultStyle);
            onStyleChange?.(defaultStyle, selectedSpell);
        }
    }, [activeStyle, weaponStyles]);

    useEffect(() => {
        if (selectedSpellName) {
            setSelectedSpell(selectedSpellName);
        }
    }, [selectedSpellName]);

    useEffect(() => {
        if (selectedAmmoName) {
            setSelectedAmmo(selectedAmmoName);
        }
    }, [selectedAmmoName]);

    useEffect(() => {
        setSelectedSpell(null);
        setSelectedAmmo(null);
        onStyleChange?.(selectedStyle, null, null);
    }, [gear.weapon?._id]);

    function handleStyleChange(style) {
        setSelectedStyle(style);

        const isMagic = style?.attack_type === "magic";
        const newSpell = isMagic ? selectedSpell : null;

        if (!isMagic) setSelectedSpell(null);

        onStyleChange?.(style, newSpell);
    }

    function handleSpellSelect(spell) {
        setSelectedSpell(spell);
        onStyleChange?.(selectedStyle, spell);
    }
    function isMagicStyle(style) {
        return style?.attack_style === "magic";
    }
    const isMagic = isMagicStyle(selectedStyle);

    function isBlowpipe(_id) {
        return _id === 12926 || _id === 28688 || _id === 30374;
    }
    const isToxicBlowpipe = isBlowpipe(gear.weapon?._id);

    function handleAmmoSelect(dart) {
        setSelectedAmmo(dart);
        setSelectedSpell(null);
        onStyleChange?.(selectedStyle, null, dart);
    }

    return (
        <>
            {weaponStyles.map((style, index) => (
                <AttackStyleCard
                    key={index}
                    styles={style}
                    weaponType={weaponType}
                    selected={style === selectedStyle}
                    onSelect={() => handleStyleChange(style)}
                />
            ))}
            {isMagic && <SpellSelector selectedSpellName={selectedSpell} onSpellSelect={handleSpellSelect} />}
            {isToxicBlowpipe && <AmmoSelector selectedAmmoName={selectedAmmo} onAmmoSelect={handleAmmoSelect} />}
        </>
    );
}

export default AttackStyleSelector;
