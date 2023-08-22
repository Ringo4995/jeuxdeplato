import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import "./Menu.css"
import { MenuContext } from '../../MenuContext';

function Logo() {
    return (
        <div>
            <h1>
                Jeux de Plat  <FontAwesomeIcon icon={faDiceD20} />
                {/* <img src={bla}></img> (si j'ai une image directement) */}
            </h1>
        </div>
    );
};
function MenuEntrie(props) {
    const menuContext = useContext(MenuContext);
    return (
        <a href={props.url} onClick={(e) => {
            e.preventDefault();
            props.text === "Panier" ?
            menuContext.fonctDisplayPanier(menuContext.displayPanier) : <></>
        }}>
            <li>{props.text}</li>
        </a>
    );
}
function Research() {
    return ""
}
function Menu() {
    const menuContext = useContext(MenuContext)
    return (
        <nav>
            <Logo></Logo>
            {
                menuContext.displayUl ?
                    <ul className={menuContext.orientation ? "menuEntriesMobile" : "menuEntries"}>
                        {/* boucle sur mon tableau d'objets menu */
                            menuContext.tabMenuNav.map((valeur, index) => {
                                return (<MenuEntrie
                                    text={valeur.text}
                                    url={valeur.url}
                                    isActive={valeur.isActive}
                                    key={index}
                                ></MenuEntrie>)
                            })
                        }
                    </ul>
                    :
                    <></>
            }
            <Research></Research>
            {
                <div onClick={() => menuContext.burgerButton(menuContext.displayUl)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                // si orientation = true affiche la div, sinon affiche rien
            }
        </nav>
    )
}

export { Menu }