AUI().ready(
	'liferay-sign-in-modal',
	function(A) {
		var BODY = A.getBody();

		var signIn = A.one('#sign-in');

		if (signIn && signIn.getData('redirect') !== 'true') {
			signIn.plug(Liferay.SignInModal);
		}

		var fullScreenToggleIcon = A.one('.full-screen-navigation #banner .navbar-toggler');

		if (fullScreenToggleIcon) {
			fullScreenToggleIcon.on(
				'click',
				function(event) {
					BODY.toggleClass('main-nav-opened', event.currentTarget.hasClass('collapsed'));
				}
			);
		}
	}
);

document.addEventListener('DOMContentLoaded', function() {
	/// Runs after senna
});

Liferay.on(
	'allPortletsReady',

	/*
	This function gets loaded when everything, including the portlets, is on
	the page.
	*/
	function() {
		highlightjs();
	}
);

function highlightjs() {
    if(typeof hljs === 'undefined' || !hljs){
		setTimeout( highlightjs, 500);
    }else{
		hljs.configure({
			tabReplace: '    '
		});

		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
    }
}