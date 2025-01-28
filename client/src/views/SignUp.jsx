import { useState } from "react";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
  username_validation,
  nickname_validation,
  password_validation,
} from "../utils/validations";
import Form from "../components/Form";

export default function SignUp() {
  const methods = useForm();
  const password = methods.watch("password");

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <Form onClick={onSubmit} buttonText='Sign Up'>
        <Input {...username_validation} />
        <Input {...nickname_validation} />
        <Input {...password_validation} />
        <Input
          label='confirm password:'
          type='password'
          id='confirmPassword'
          placeholder='confirm password...'
          validation={{
            required: {
              value: true,
              message: "Required",
            },
            validate: (value) => value === password || "Passwords don't match",
          }}
        />
      </Form>
    </FormProvider>
  );
}

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     username: "",
//     nickname: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState([]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.status === 201) {
//         alert("Successfully signed up!");
//         setErrors([]);
//       } else {
//         if (data.error) {
//           if (data.field === "username" || data.field === "nickname") {
//             setErrors([{ msg: data.error }]);
//           } else if (data.details) {
//             setErrors(data.details);
//           }
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       <h3>Sign up</h3>
//       <form action=''>
//         <label htmlFor='username'>Username:</label>
//         <input
//           type='text'
//           name='username'
//           id='username'
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor='nickname'>Nickname:</label>
//         <input
//           type='text'
//           name='nickname'
//           id='nickname'
//           value={formData.nickname}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor='password'>Password:</label>
//         <input
//           type='password'
//           name='password'
//           id='password'
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor='confirmPassword'>Confirm password:</label>
//         <input
//           type='password'
//           name='confirmPassword'
//           id='confirmPassword'
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
//         <button onClick={handleSubmit}>Sign up</button>
//         <div>
//           {errors &&
//             errors.map((error, index) => <div key={index}>{error.msg}</div>)}
//         </div>
//       </form>
//     </div>
//   );
// }
