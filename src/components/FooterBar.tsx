import Image from "next/image";
import {FaEnvelope, FaFacebook, FaInstagram, FaLocationPin, FaPhone, FaTelegram} from "react-icons/fa6";

const FooterBar = () => {
    // Make footer stay at the bottom of the page
    return (
        <footer className={' w-screen py-20 bg-[#277B12] flex flex-row justify-evenly items-center bottom-0 left-0 right-0'}>
            <div className={'flex flex-col justify-center space-y-4 items-center'}>
                <Image src={'/images/urep_large.png'} alt={'FMYD LOGO'} width={150} height={150}/>
                <h1 className={'text-6xl font-bold text-white'}>UREP</h1>
            </div>

            {/* Location and Contact */}
            <div className={'flex flex-col justify-center space-y-4 w-60'}>
                <h4 className={'font-bold text-white text-sm'}>Contact Us</h4>
                <div className={'flex flex-row items-center gap-x-4'}>
                    <FaLocationPin size={50} color={'white'}/>
                    <p className={'text-white text-xs break-words whitespace-normal'}>BULLET BUILDING, SHEHU SHAGARI WAY,
                        CENTRAL BUSINESS DISTRICT
                        ABUJA , 900103,FEDERAL CAPITAL TERRITORY</p>
                </div>
                <div className={'flex flex-row items-center gap-x-4'}>
                    <FaEnvelope size={20} color={'white'}/>
                    <p className={'text-white text-xs font-medium'}>info@fmyd.gov.ng</p>
                </div>
                <div className={'flex flex-row items-center gap-x-4'}>
                    <FaPhone size={20} color={'white'}/>
                    <p className={'text-white text-xs font-medium'}>+234 800 900 900</p>
                </div>
            </div>

            {/* Socials*/}
            <div className={'flex flex-col  justify-center'}>
                <h4 className={'font-bold text-white text-sm'}>Socials</h4>
                <FaFacebook size={20} color={'white'} className={'mt-4'}/>
                <p className={'text-white text-sm font-medium'}>Facebook</p>
                <FaInstagram size={20} color={'white'} className={'mt-4'}/>
                <p className={'text-white text-sm font-medium'}>Instagram</p>
                <FaTelegram size={20} color={'white'} className={'mt-4'}/>
                <p className={'text-white text-sm font-medium'}>Telegram</p>
            </div>

            {/* Quick Links */}
            <div className={'flex flex-col justify-center'}>
                <h4 className={'font-bold text-white text-sm'}>Quick Links</h4>
                <a href={'/'} className={'text-white text-sm font-medium mt-2'}>Home</a>
                <a href={'/about'} className={'text-white text-sm font-medium mt-2'}>About</a>
                <a href={'/contact'} className={'text-white text-sm font-medium mt-2'}>Program</a>
                <a href={'/youth'} className={'text-white text-sm font-medium mt-2'}>Youth Policy</a>
                <a href={'/privacy'} className={'text-white text-sm font-medium mt-2'}>Privacy Policy</a>
            </div>
        </footer>
    )
}

export default FooterBar;