import { useEffect, useState } from "react";
import "./Discount.css";
import Image from "../../assets/Images/Image.png";
import JBL from "../../assets/Images/jbl.png";
import Iphone from "../../assets/Images/iphone.png";
import MacBook from "../../assets/Images/mac.png"; 
function Discount() {
    // Chegirma tugash vaqti (misol: 3 kun keyin)
    const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

    const [timeLeft, setTimeLeft] = useState(getTime());

    function getTime() {
        const now = new Date().getTime();
        const diff = endTime - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="main_wrapper">
            <div className="container">

                <div className="discount">
                    <div className="text_left">


                        <div className="first">
                            <p>Chegirmalar vaqti keldi!</p>

                            <h1>Tanlangan mahsulotlarga <span>50%</span> gacha chegirma</h1>
                            <p>
                                Eng mashhur mahsulotlarda katta chegirmalar! Sevimli buyumlaringizni
                                arzon narxda qo‘lga kiriting.
                            </p>
                        </div>
                        <br />
                        <div className="center">
                            <p>Chegirma tugashiga qolgan vaqt:</p>
                            <br />
                            <div className="timer">
                                <div>
                                    <h2>{timeLeft.days}</h2>
                                    <span>Kun</span>
                                </div>
                                <div>
                                    <h2>{timeLeft.hours}</h2>
                                    <span>Soat</span>
                                </div>
                                <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="#A62C41" />
                                    <circle cx="3" cy="15" r="3" fill="#A62C41" />
                                </svg>

                                <div>
                                    <h2>{timeLeft.minutes}</h2>
                                    <span>Daqiqa</span>
                                </div>
                                <div>
                                    <h2>{timeLeft.seconds}</h2>
                                    <span>Soniya</span>
                                </div>
                            </div>
                        </div>

                        <button>Hoziroq xarid qiling!</button>
                    </div>
                    <div className="img_right">
                        <img src={Image} alt="" />
                    </div>
                </div>
            </div>
            <section className="arrivals">
                <div className="container">
                    <h2 className="arrivals-title">Yangi kelgan mahsulotlar</h2>

                    <div className="arrivals-grid">
                        <div className="arrival-card">
                            <p className="brand">JBL Flip 3</p>
                            <h3>Oldingidan ham kuchliroq ovoz</h3>
                            <span className="price">$289.99</span>
                            <img src={JBL} alt="JBL Flip 3" />
                        </div>
                        <div className="arrival-card">
                            <p className="brand">iPhone 14 Pro</p>
                            <h3>Hamma uchun yaxshiroq texnologiya</h3>
                            <span className="price">$900</span>
                            <img src={Iphone} alt="iPhone 14 Pro" />
                        </div>

                        <div className="arrival-card">
                            <p className="brand">MacBook Air 13</p>
                            <h3>Mac bilan tanishing</h3>
                            <span className="price">$999</span>
                            <img src={MacBook} alt="MacBook Air" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Discount;
