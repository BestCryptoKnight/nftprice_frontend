import React from 'react';

const pricing= () => (
  <section className='container'>
        <div className="row sequence">

          <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
              <div className="pricing-s1 mb30">
                  <div className="top">
                      <h2>Free</h2>
                      <p className="plan-tagline">Basic</p>            
                  </div>
                  <div className="mid text-light bg-color">
                      <p className="price">
                          <span className="currency">$</span>
                          <span className="m opt-1">0</span>
                          <span className="month">p/mo</span>
                      </p>               
                  </div>
                  
                  <div className="bottom">
                      <ul>
                          <li><i className="fa fa-check"></i>1 device</li>
                          <li><i className="fa fa-check"></i>Daily reminder</li>
                          <li><i className="fa fa-check"></i>Simple reporting</li>
                          <li><i className="fa fa-check"></i>Standart dashboard</li>
                          <li><i className="fa fa-check"></i>Email Notification</li>
                          <li><i className="fa fa-check"></i>Email Support</li>
                      </ul>
                  </div>
                  
                  <div className="action">
                      <a href="register.html" className="btn-main">Sign Up Now</a>
                  </div>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
              <div className="pricing-s1 mb30">
                  <div className="top">
                      <h2>Pro</h2>
                      <p className="plan-tagline">For Individuals</p>
                  </div>
                      <div className="mid text-light bg-color">
                      <p className="price">
                          <span className="currency">$</span>
                          <span className="m opt-1">9.59</span>
                          <span className="month">p/mo</span>
                      </p>     
                  </div>
                  <div className="bottom">
                      <ul>
                          <li><i className="fa fa-check"></i>Up to 2 devices</li>
                          <li><i className="fa fa-check"></i>Daily reminder</li>
                          <li><i className="fa fa-check"></i>Detailed reporting</li>
                          <li><i className="fa fa-check"></i>Interactive dashboard</li>
                          <li><i className="fa fa-check"></i>Email and SMS notification</li>
                          <li><i className="fa fa-check"></i>24/7 Customer Support</li>
                      </ul>
                  </div>
                  
                  <div className="action">
                      <a href="register.html" className="btn-main">Sign Up Now</a>
                  </div>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
              <div className="pricing-s1 mb30">
                  <div className="top">
                      <h2>For Teams</h2>
                      <p className="plan-tagline">Best for organization</p>
                  </div>
                  <div className="mid text-light bg-color">
                      <p className="price">
                          <span className="currency">$</span>
                          <span className="m opt-1">24.99</span>
                          <span className="month">p/mo</span>
                      </p>     
                  </div>
                  <div className="bottom">
                      <ul>
                          <li><i className="fa fa-check"></i>Up to 10 devices</li>
                          <li><i className="fa fa-check"></i>Daily reminder</li>
                          <li><i className="fa fa-check"></i>Detailed reporting</li>
                          <li><i className="fa fa-check"></i>Interactive dashboard</li>
                          <li><i className="fa fa-check"></i>Email and SMS notification</li>
                          <li><i className="fa fa-check"></i>24/7 Customer Support</li>
                      </ul>
                  </div>
                  
                  <div className="action">
                      <a href="register.html" className="btn-main">Sign Up Now</a>
                  </div>
              </div>
          </div>


          <div className="col-lg-6 offset-lg-3 text-center">
              <small>Price shown are in USD and VAT inclusive.</small>
          </div>

        </div>
    </section>
  
);
export default pricing;