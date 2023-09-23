import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function FunFacts() {
  const { auth } = useAuth();
  const initialMessage = ` Hello ${auth?.username}, Did you know that...`;
  const [Message, SetMessage] = useState(initialMessage);

  const facts = [
    "Your mouth produces about one litre of saliva each day!",
    "Laid end to end, an adult's blood vessels could circle Earth's equator four times!",
    "Bodies give off a tiny amount of light that's too weak for the eye to see.",
    "Information zooms along nerves at about 400 km/h!",
    " Your eyes blink around 20 times a minute. That’s over ten million times a year!",
    "Your ears never stop growing!",
    "The tongue is covered in about 8,000 taste-buds, each containing up to 100 cells helping you taste your food!",
    "There has been a myth that the human heart is located on the side of the chest, but in reality, the heart is neither on the left or the right but the centre of the chest.",
    "The right-hand side of the human brain controls the left part of the body whereas the left side of the brain controls the right part of the body.",
    "The cornea, a front portion of the eye, is the unique part of the entire human body, which lacks blood supply and receives its oxygen directly from the air.",
    "Gross anatomy is used for studying in detail about the different organs and is mainly used in endoscopy, angiography, magnetic resonance imaging (MRI) and X-rays.",
    "The human tongue is the strongest muscle and the jawbone is the hardest bone in the human body.",
  ];
  const randomNumber = Math.floor(Math.random() * facts.length) + 1;
  const randomfacts = facts[randomNumber];
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

export default FunFacts;
