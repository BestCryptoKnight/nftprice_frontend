import React, { memo } from "react";

const Checkout = () => {

    const [openCheckout, setOpenCheckout] = React.useState(true);

    return (
      <div>
      { openCheckout &&
        <div className='checkout'>
        <div className='maincheckout'>
        <button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
       		<div className='heading'>
       			<h3>Checkout</h3>
       		</div>
          <p>You are about to purchase a <span className="bold">AnimeSailorClub #304</span> 
          <span className="bold">from Monica Lucas</span></p>
       		<div className='detailcheckout mt-4'>
       			<div className='listcheckout'>
              <h6>
                Enter quantity. 
                <span className="color">10 available</span>
              </h6>
              <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control"/>
       			</div>

       		</div>
       		<div className='heading mt-3'>
       			<p>Your balance</p>
       			<div className='subtotal'>
       			10.67856 ETH
       			</div>
       		</div>
          <div className='heading'>
            <p>Service fee 2.5%</p>
            <div className='subtotal'>
            0.00325 ETH
            </div>
          </div>
          <div className='heading'>
            <p>You will pay</p>
            <div className='subtotal'>
            0.013325 ETH
            </div>
          </div>
       		<button className='btn-main lead mb-5'>Checkout</button>
        </div>
        </div>
        }
        </div>
    );
};

export default memo(Checkout);