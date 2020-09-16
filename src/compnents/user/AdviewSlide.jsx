import React from "react";
import pic from "../images/pic.jpg";
import land from "../images/land.PNG";


export default function AdviewSlide() {
	return (
		<div>
			<div 
				class="uk-position-relative uk-visible-toggle uk-light"
				tabindex="-1"
				uk-slider="center: true">
				<ul
                  uk-lightbox="animation: slide"
					class="uk-slider-items uk-grid uk-grid-match"
					uk-height-viewport="offset-top: true; offset-bottom: 30">
					<li class="uk-width-3-4">
						<a class="uk-cover-container uk-inline" href={land} data-caption="Caption 1">
							<img
								src={land}
								style={{ height: "50%", width: "100%" }}
								alt=""
								uk-cover
							/>    
						</a>
					</li>
					<li class="uk-width-3-4">
						<a class="uk-cover-container uk-inline" href={pic} data-caption="Caption 1">
							<img
								src={pic}
								style={{ height: "50%", width: "100%" }}
								alt=""
								uk-cover
							/>      
						</a>
					</li>
				</ul>

				<a
					class="uk-position-center-left uk-position-small uk-hidden-hover"
					href="#"
					uk-slidenav-previous
					uk-slider-item="previous"></a>
				<a
					class="uk-position-center-right uk-position-small uk-hidden-hover"
					href="#"
					uk-slidenav-next
					uk-slider-item="next"></a>
			</div>
		</div>
	);
}
