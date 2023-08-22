import Card from "../Card/Card";
import "./Boutique.css";

function Boutique(props){

    return(
        <section>
            {
                props.articles.map((value,index)=>{
                    return(
                        <Card
                        article={value}
                        key={index}
                        ></Card>
                    )
                })
            }
        </section>
    )
}

export default Boutique;