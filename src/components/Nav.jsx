import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav aria-label="Global" className="hidden md:block">
              <ul className="flex flex-wrap justify-center font-bold gap-6 md:gap-8 lg:gap-12">
                <li>
                  <Link to="/home"
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link to="/events"
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Events{" "}
                  </Link>
                </li>

                <li>
                  <a
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Blog{" "}
                  </a>
                </li>
              </ul>
            </nav>

  )
}

export default Nav