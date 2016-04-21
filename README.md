# agegate

Simple jquery popup that requires a user to type their birthday into a form with optional remember me cookie.

Set       
age: '21',
cookieLength: '7',
cookieName: 'ageGate'

Call 
jQuery.ageGate();

or pass settings

jQuery.ageGate({
  age: '21',
  cookieLength: '7',
  cookieName: 'ageGate'
});

TODO:
Fix cookie regex to work
