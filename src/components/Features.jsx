import React from "react";
import { BsBank } from "react-icons/bs";
import { FaMobileAlt, FaShieldAlt } from "react-icons/fa";

function Features() {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-primary text-black py-20">
              <h1 className="text-4xl font-bold mb-5">Online Bank Auth</h1>
              <p className="mb-10">
                Manage your finances on the go with our mobile banking app.
              </p>
              <button className="bg-indigo-500 hover:bg-accent-hover text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-white py-20" id="about">
              <h2 className="text-3xl font-bold mb-5">About Us</h2>
              <p className="mb-10">
                Our mobile banking app is designed to make managing your
                finances easy and convenient.
              </p>
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                    <BsBank className="text-blue-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Banking</h3>
                    <p className="text-gray-600 text-center">
                      Manage all your banking needs with ease and security.
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                    <FaMobileAlt className="text-green-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Mobile Access
                    </h3>
                    <p className="text-gray-600 text-center">
                      Access your account anytime, anywhere with our mobile app.
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                    <FaShieldAlt className="text-red-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Security</h3>
                    <p className="text-gray-600 text-center">
                      Your data is protected with top-notch security measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-white py-20" id="features">
              <h2 className="text-3xl font-bold mb-5">Features</h2>
              <ul className="flex flex-wrap justify-center mb-10">
                <li className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6">
                  <i className="fas fa-mobile-alt text-4xl text-accent"></i>
                  <h3 className="text-2xl font-bold mb-2">Mobile Banking</h3>
                  <p>
                    Manage your accounts, transfer money, and pay bills on the
                    go.
                  </p>
                </li>
                <li className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6">
                  <i className="fas fa-lock text-4xl text-accent"></i>
                  <h3 className="text-2xl font-bold mb-2">Secure</h3>
                  <p>
                    Our app uses state-of-the-art security measures to protect
                    your data.
                  </p>
                </li>
                <li className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6">
                  <i className="fas fa-chart-line text-4xl text-accent"></i>
                  <h3 className="text-2xl font-bold mb-2">Budgeting Tools</h3>
                  <p>
                    Track your spending and stay on top of your finances with
                    our budgeting tools.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
