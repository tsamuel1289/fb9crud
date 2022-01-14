
export function downHalfTone(content) {
        let bajado = content.replace(/C |Cm |C# |C#m |D |Dm |D# |D#m |Eb |Ebm |E |Em |F |Fm |F# |F#m |G |Gm |G# |G#m |A |A#m |Bb |Bbm |B |Bm /g , (chord)=>{
                switch(chord){
                        case "C ": return "B ";
                        case "Cm ": return "Bm ";
                        case "C# ": return "C ";
                        case "C#m ": return "Cm ";
                        case "D ": return "C# ";
                        case "Dm ": return "C#m ";
                        case "D# ": return ".D ";
                        case "D#m ": return "Dm ";
                        case "Eb ": return "D ";
                        case "Ebm ": return "Dm ";
                        case "E ": return "Eb ";
                        case "Em ": return "Ebm ";
                        case "F ": return "E ";
                        case "Fm ": return "Em ";
                        case "F# ": return "F ";
                        case "F#m ": return "Fm ";
                        case "G ": return "F# ";
                        case "Gm ": return "F#m ";
                        case "G# ": return "G ";
                        case "G#m ": return "Gm ";
                        case "A ": return "G# ";
                        case "Am ": return "G#m ";
                        case "A# ": return "A ";
                        case "A#m ": return "Am ";
                        case "Bb ": return "A ";
                        case "Bbm ": return "Am ";
                        case "B ": return "Bb ";
                        case "Bm ": return "Bbm ";
                }
        })
        return (bajado)
}





