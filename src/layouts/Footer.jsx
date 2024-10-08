import React from "react";
// import Wave from "react-wavify";
import Wave from "../components/wave.jsx";
import logoOk from '../assets/logoOk.png';
import gif from "../assets/WaveCen.gif";


function Footer() {
  return (
    <>
      {/* <img src="/src/assets/wave-haikei.svg" alt="" className="w-full" /> */}
    <Wave fill='#F2BB13' />
      <footer className="bg-[#F2BB13] p-5"> {/* Reducido el padding a 5 */}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 rounded-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}> {/* Opacidad del 50% */}
          <div className="flex-1 justify-center md:flex md:items-center md:gap-12">
            <a className="flex justify-center items-center gap-5" href="#">
              <img src={logoOk} alt="" className="h-24" />
              <div className="relative inline-block">
                <img
                  src={gif}
                  alt="WaveCenter Logo"
                  className="inline-block w-36 h-auto"
                />
              </div>
            </a>
          </div>

          <p className="mx-auto mt-6 max-w-6xl text-center text-l leading-relaxed">
            Your portal to unforgettable events! Buy your tickets, secure the best seats, and immerse yourself in the world of the most exciting shows. Be part of the action and feel the energy of every event with WaveCenter. Get ready for experiences you'll remember forever! 🌊
          </p>

          {/* <div className="my-12">
            <Nav />
          </div> */}

          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            {['Facebook', 'Instagram', 'Twitter', 'GitHub'].map((platform) => (
              <li key={platform}>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  <span className="sr-only">{platform}</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {platform === 'Facebook' && (
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    )}
                    {platform === 'Instagram' && (
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    )}
                    {platform === 'Twitter' && (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.143 4.143 0 01-1.089.146c-.267 0-.52-.025-.765-.073a4.116 4.116 0 003.83 2.842A8.227 8.227 0 012 17.688a11.638 11.638 0 006.29 1.838z" />
                    )}
                    {platform === 'GitHub' && (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.164 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.783.606-3.374-1.343-3.374-1.343-.455-1.163-1.113-1.473-1.113-1.473-.911-.622.069-.609.069-.609 1.008.071 1.538 1.035 1.538 1.035.895 1.532 2.34 1.09 2.91.834.091-.648.351-1.09.638-1.34-2.221-.25-4.556-1.115-4.556-4.967 0-1.097.392-1.993 1.035-2.693-.103-.252-.448-1.266.098-2.64 0 0 .84-.27 2.75 1.023A9.581 9.581 0 0112 3.5c.843.004 1.693.114 2.487.334 1.91-1.292 2.75-1.023 2.75-1.023.547 1.374.202 2.388.1 2.64.644.7 1.034 1.596 1.034 2.693 0 3.865-2.34 4.712-4.56 4.963.359.308.677.916.677 1.845 0 1.333-.012 2.417-.012 2.746 0 .265.18.578.685.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;