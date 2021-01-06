import React from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Container } from "../components/Container";

type RegisterFormInputs = {
  name: string;
  password: string;
};

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const { register, handleSubmit, errors } = useForm<RegisterFormInputs>({
    mode: "onBlur",
  });

  const onSubmit = (values: RegisterFormInputs) => console.log(values);

  return (
    <Container height="100vh">
      <form>
        <FormControl
          isInvalid={!!errors?.name}
          errortext={errors?.name?.message}
          p="4"
          isRequired
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Username"
            ref={register}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          px="4"
          pb="4"
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
          />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>

        <Button onClick={handleSubmit(onSubmit)} p="4" mx="4" mt="6" w="90%">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
