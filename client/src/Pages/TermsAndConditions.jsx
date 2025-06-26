import React from "react";

import endImg from "./../assets/img/end-design.png"

function TermsAndConditions() {
  return (
    <div className="maindiv">
      <div className="container">
        <h1>
          <u>TERMS AND CONDITION</u>
        </h1>
        <div className="terems">
          <h2>Terms Of Use</h2>
          <p className="mt-3 fw-bold">Effective Date: 16/05/2025</p>
          <p>
            Welcome to <span className="exp">"Enpensio"</span>. By accessing or using our
            expense tracker and budget planner application{" "}
            <span className="exp">("Service")</span>, you agree to be bound by these Terms
            of Use <span className="exp">("Terms")</span>. If you do not agree, please do
            not use our Service.
          </p>

          <ol type="1" className="terms_ol">
            <li>Use of the Service</li>
            <ul className="terms_ul">
              <li>You must be at least 18 years old to use this app.</li>
              <li>
                You agree not to misuse the Service or access it using a method
                other than the interface and instructions provided.
              </li>
            </ul>

            <li>User Accounts</li>
            <ul className="terms_ul">
              <li>
                You may be required to create an account. You are responsible
                for maintaining the confidentiality of your login credentials.
              </li>
              <li>
                You are responsible for all activities that occur under your
                account.
              </li>
            </ul>

            <li>Data and Content</li>
            <ul className="terms_ul">
              <li>
                You retain ownership of your financial data entered into the
                app.
              </li>
              <li>
                We do not sell your data. Your data is used solely to provide
                and improve the Service.
              </li>
            </ul>

            <li>Subscription and Payments (if applicable)</li>
            <ul className="terms_ul">
              <li>Certain features may require a paid subscription.</li>
              <li>
                Subscription fees are billed in advance and are non-refundable.
              </li>
            </ul>

            <li>Termination</li>
            <ul className="terms_ul">
              <li>
                We reserve the right to suspend or terminate your access if you
                violate these Terms.
              </li>
            </ul>

            <li>Disclaimer</li>
            <ul className="terms_ul">
              <li>
                The Service is provided "as is" without warranties of any kind.
                We do not guarantee the accuracy or reliability of financial
                data analytics.
              </li>
            </ul>

            <li>Limitation of Liability</li>
            <ul className="terms_ul">
              <li>
                We are not liable for any loss or damage resulting from your use
                of the Service.
              </li>
            </ul>

            <li>Changes to Terms</li>
            <ul className="terms_ul">
              <li>
                We may update these Terms from time to time. Continued use of
                the Service means you accept the changes.
              </li>
            </ul>

            <li>Contact</li>
            <ul className="terms_ul">
              <li>
                If you have any questions, contact us at{" "}
                <span className="mail">[expensioweb@gmail.com]</span>.
              </li>
            </ul>
          </ol>
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <img src={endImg} alt="end-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
