import React, { memo } from "react";

const Checkout = () => {

    return (
        <div className='maincheckout'>
       		<div className='heading'>
       			<h3>Items Checkout Bid</h3>
       			<div className='subtotal'>
       			Subtotal
       			</div>
       		</div>
       		<div className='detailcheckout'>
       			<div className='listcheckout'>
       				<div className='description'>
       					<h3>Pinky Ocean</h3>
       					<p>Sed ut perspiciatis unde omnis iste natus error sit</p>
       				</div>
       			</div>
       			<div className='price'>
       			0.08 ETH
       			</div>
       		</div>
       		<div className='heading mt-3'>
       			<h3>Totals</h3>
       			<div className='subtotal'>
       			0.08 ETH
       			</div>
       		</div>
       		<div className='agrement'>
       		<input type="checkbox" id="checlist" name="checlist" value="Nft"/>
  <label htmlFor="vehicle1"> By Checking this I Agree for Terms and Services</label>
       		</div>
       		<button className='btn-main lead mb-5'>Checkout</button>
        </div>
    );
};

export default memo(Checkout);