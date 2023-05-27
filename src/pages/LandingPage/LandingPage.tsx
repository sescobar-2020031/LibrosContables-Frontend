import Cards from "../../components/HomePage-Cards/Cards";
import Home from "../../components/HomePage-Home/Home";
import AdditionalInformation from "../../components/HomePage-AdditionalInformation/AdditionalInformation";
import Contact from "../../components/HomePage-Contact/Contact";
import Footer from "../../components/Footer/Footer";
import ButtonUp from "../../components/ButtonUp/ButtonUp";

function LandingPage() {
    return (
        <>
            <Home />
            <Cards />
            <AdditionalInformation />
            <Contact />
            <Footer />
            <ButtonUp />
        </>
    )
}

export default LandingPage;
