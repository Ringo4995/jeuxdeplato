import React, { useContext } from 'react';
import styles from './Card.module.css';
import Bouton from '../Bouton/Bouton';
import { BoutiqueContext } from '../../BoutiqueContext';

/* function Card(props){
  return (
    <div className={styles.Card}>
    Card Component
  </div>
  )
} 
est identique à :*/

const Card = (props) => {
  const boutiqueContext = useContext(BoutiqueContext);
  return (
    <div className={styles.Card}>
      <div className={styles.Picture} ><img className={styles.pipicture} src={props.article.url}></img></div>

      <div className={styles.contenantDroite}>
        <div className={styles.jeu}>  {props.article.name}</div>
        <div className={styles.prix}>{props.article.price} €</div>
        <div className={styles.stock}>Notre stock : {props.article.qte}</div>
        <div className={styles.desc}>{props.article.description}</div>
        {
          /* props.article.promo && <p className={styles.promo}>PROMO</p> */
          props.article.promo ? <p className={styles.promo}>PROMO</p> : <></>
        }
        <Bouton id={props.article.id} ></Bouton>
      </div>
    </div>
  );

};

export default Card;
