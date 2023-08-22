import { useContext } from "react"
import "./Panier.css"
import { BoutiqueContext } from "../../BoutiqueContext"
import { MenuContext } from "../../MenuContext"
const Panier = () => {
    const boutiqueContext = useContext(BoutiqueContext)
    const menuContext = useContext(MenuContext)
    const paniertmp = [];
    if (boutiqueContext.tabPanier.length > 0) {
        const tabPanier = boutiqueContext.tabPanier.sort();
        let i = 0;
        tabPanier.map((valeur, index) => {
            i++;
            if (valeur !== tabPanier[index + 1]) {
                paniertmp.push([valeur, i]);
                i = 0;
            }
        })
        console.dir(paniertmp);
    }
    return (
        <div className="backPanier">
            <div className="panier">
                <h2>
                    Votre Panier
                </h2>
                <p className="close" onClick={
                    () => {
                        menuContext.fonctDisplayPanier(menuContext.displayPanier)
                    }
                }>x</p>
                {
                    /* je boucle sur le tabPanier qui contient les id de mes articles achetés*/
                    boutiqueContext.tabPanier.length > 0 ?
                        paniertmp.map((valeur, index) => {
                            let name = boutiqueContext.articles[valeur[0]].name;
                            let priceu = boutiqueContext.articles[valeur[0]].price;
                            let pricet = boutiqueContext.articles[valeur[0]].price * valeur[1];
                            let qtea = valeur[1];
                            let url = boutiqueContext.articles[valeur[0]].url;
                            // sur le modèle  de mon Bouton.js je "surveille" la qte disponible pour rendre mon bouton + actif ou inactif
                            let isActiveplus = boutiqueContext.articles[valeur[0]].qte === 0 ? true : false
                            return (
                                <div key={index}>
                                    <span className="panimg"><img src={url} alt={name}></img></span>
                                    <span>{name}</span>
                                    <span>{priceu}€/unité</span>
                                    <button className="panbtn" 
                                    disabled = {isActiveplus}
                                    onClick={()=>{
                                        /* depuis le onClick sur ce bouton j'appelle la fonction decrementQte liée à mon stateArticles ( et donc mon BoutiqueContexte dans App.js )*/
                                        boutiqueContext.decrementQte(valeur[0])
                                    }}
                                    >+</button>
                                    <span>{qtea}</span>
                                    <button className="panbtn"
                                    onClick={()=>{
                                        boutiqueContext.incrementQte(valeur[0])
                                    }}
                                    >-</button>
                                    <span>{pricet}€</span>
                                </div>
                            )
                        })
                        :
                        <div>Votre panier est actuellement vide</div>
                }
                {
                    boutiqueContext.tabPanier.length > 0 ?
                        <div>Votre total : {boutiqueContext.totalPanier}€</div>
                        :
                        ""
                }
            </div>

        </div>
    )
}
export { Panier }