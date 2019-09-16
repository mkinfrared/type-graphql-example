import { GraphQLError, GraphQLFormattedError } from "graphql";
// import { ValidationError } from "yup";

type FormatError = (error: GraphQLError) => GraphQLFormattedError;

const formatError: FormatError = e => {
  return e;
};

export default formatError;
