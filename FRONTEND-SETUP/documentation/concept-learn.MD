
//================================= 1) { replace: true }  START =================================

1) navigate("/sign-in", { replace: true });
replace:true

It tells React Router:

“Don’t add a new entry to browser history.
Replace the current one.”


Without replace: true (DEFAULT behavior)
navigate("/sign-in");



//================================= 1) { replace: true }  END =================================