import React, { useState } from "react";
import instance from "../../utils/configAxios";

const ForgotPassword = ({ token }) => {
  const [email, setEmail] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await instance.post(
        "/user/forgotPassword",
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ForgotPassword;
