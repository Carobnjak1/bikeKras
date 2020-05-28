import React from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Ste pozabili geslo?</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Za nastavitev novega geslo vpišite vaš
        email naslov
      </p>
      <div className="form form-group mb">
        <input
          onChange={(event) => setResetPasswordEmail(event.target.value)}
          type="email"
          placeholder="Email"
          name="email"
          minLength="6"
          required
        />
      </div>
      <button className="btn btn-primary" onClick={handleResetPassword}>
        Novo geslo
      </button>
      {isPasswordReset && (
        <div className="alert alert-success">Preveri email za novo geslo</div>
      )}
      {passwordResetError && (
        <div className="alert alert-danger">{passwordResetError}</div>
      )}
    </section>
  );
}

export default ForgotPassword;
