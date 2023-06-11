import style from "../modulos/Cards.module.css";
import Card from "./Card"

export default function Cards(props){
    const {characters} = props
    return(
        <div className={style.divPadre}>
            
               {    
                    characters?.map(character => {
                        if(character){
                            return <Card
                            key={character?.pokemon.id}
                            id={character?.pokemon.id}
                            name={character?.pokemon.name}
                            image={character?.pokemon.image}
                            types={character?.pokemon.types}></Card>
                        }
                        })
               }                    
        </div>
    )
}