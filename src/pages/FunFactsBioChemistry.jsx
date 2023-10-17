import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function FunFactsBioChemistry() {
  const { auth } = useAuth();

  const initialMessage = ` Hello ${auth?.username}, Did you know that...`;

  const [Message, SetMessage] = useState(initialMessage);

  const funBiochemistryFacts = [
    "Eating chocolate can lead to the release of endorphins, which are natural mood lifters.",
    "The idea of a 'tongue map' for different tastes is a myth; taste receptors for all tastes are distributed all over the tongue.",
    "Burping after drinking soda is due to the release of carbon dioxide gas formed when carbonic acid in soda breaks down.",
    "The spiciness of hot peppers is caused by a compound called capsaicin, which triggers pain receptors in the mouth.",
    "The sensation of 'butterflies in the stomach' is caused by the release of stress hormones during periods of excitement or anxiety.",
    "Thaumatin, found in the miracle berry, can make sour foods taste sweet and is hundreds of times sweeter than sugar.",
    "Fireflies and some jellyfish produce light through bioluminescence for communication and attracting mates.",
    "Emotional tears contain different biochemical constituents compared to reflex tears and have higher levels of proteins and hormones.",
    "The brain consumes a significant portion of the body's glucose for energy, despite making up only about 2% of the body's weight.",
    "When garlic is cut or crushed, it produces allicin, a sulfur-containing compound responsible for both its odor and potential health benefits.",
  ];

  const randomNumber =
    Math.floor(Math.random() * funBiochemistryFacts.length) + 1;

  const randomfacts = funBiochemistryFacts[randomNumber];

  useEffect(() => {
    SetMessage(randomfacts);
  }, []);

  return (
    <div>
      <h1 className=" text-3xl text-center mt-36">
        {` Hello ${auth?.foundUser?.username}, Did you know that...`}
      </h1>
      <h1 className=" text-3xl text-center mt-36">{Message}</h1>
    </div>
  );
}

export default FunFactsBioChemistry;
