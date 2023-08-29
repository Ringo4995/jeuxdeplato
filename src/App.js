import { useState } from 'react';
import { Menu } from './components/Menu/Menu';
import './App.css';
import Boutique from './components/Boutique/Boutique';
import articles from './articles.js'
import { BoutiqueContext } from './BoutiqueContext';
import { MenuContext } from './MenuContext';
import { Panier } from './components/Panier/Panier';

function App() {
  // déclaration de mes states
  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
      "displayUl": !responsive(),
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false
        },
        {
          text: "Panier",
          url: "#",
          isActive: false
        },
        {
          text: "Contact",
          url: "#",
          isActive: false
        }
      ],
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier
    }
  )
  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "tabPanier": [],
      "totalPanier": 0,
      "decrementQte": decrementQte,
      "incrementQte": incrementQte
    }
  );
  function responsive() {
    let orientation; // false => portrait(mobile), true =>paysage (desktop) ; sert à savoir si on est en portrait ou en paysage au lancement de l'appli
    if (window.innerHeight > window.innerWidth) {
      orientation = true
    } else {
      orientation = false
    }
    // ou utiliser l'event "deviceOrientation"
    return orientation;
  }
  function burgerButton(disp) {
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })
  }
  function fonctDisplayPanier(disp) {
    setStateMenu({
      ...stateMenu,
      "displayPanier": !disp
    })
  }
  function decrementQte(id) {
    //je fais une copie de mon tableau stateArticles car il est en lecture seule et je ne peux pas le modifier directement
    let articlesTmp = stateArticles.articles;
    //je modifie la qte de l'article correspondant à l'id transmis par mon component Bouton
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        valeur.qte > 0 && --valeur.qte;
        /* if(valeur.qte === 0){
          valeur.qte = 0;
        } else{
          valeur.qte -=1;
        } */
      }
    })
    // j'ajoute l'id de l'article acheté au tableau stateArticles.tabPanier
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    // je réassigne le nouveau tableau artcle modifié à mon stateArticles grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,
        // ... rappelle toutes les propriétés de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    // console.dir(stateArticles.tabPanier);
    calculTotal()
  }
  function incrementQte(id) {
    let supprIndex;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        //je récupère dans mon tableau stateArticles.tabPanier l'index de l'article à supprimer
        supprIndex = index;
      }
    })
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);

    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        ++valeur.qte;
      }
    })
    // une fois toutes les modifications effectuées sur mes tableaux tempiraires je peux les affecter à mes states

    setStateArticles(
      {
        ...stateArticles,
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    calculTotal()
  }
  function calculTotal(){
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur)=>{
      totalTmp += stateArticles.articles[valeur].price;
    })
    setStateArticles(
      {
        ...stateArticles,
        "totalPanier":totalTmp
      }
    )
  }


  window.addEventListener("deviceorientation", (e) => {
    /* stateMenu.setOrientation(responsive());
    stateMenu.setDisplayUl(!stateMenu.orientation); */
    /* let stateMenuOrientationTmp = stateMenu.orientation;
    let stateMenuTabMenuNavTmp = stateMenu.tabMenuNav;
    setStateMenu(
      {
        "orientation":responsive(),
        "displayUl":!stateMenuOrientationTmp,
        "tabMenuNav": stateMenuTabMenuNavTmp
      }
    ) */
  });

  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>

        <header>
          <Menu></Menu>
        </header>
        <main>
          {
            stateMenu.displayPanier ?
              <Panier></Panier>
              :
              <></>
          }
          <Boutique articles={stateArticles.articles}></Boutique>
        </main>
        <footer></footer>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
