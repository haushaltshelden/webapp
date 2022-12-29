import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { useErrorsStore } from "../stores/useErrors";
import { setContext } from "@apollo/client/link/context";
import { useUserStore } from "@/stores/user";

const currentUrl = window.location.href;

const url = currentUrl.includes('localhost') ? 'http://localhost:5000/graphql' : 'https://api.trade-of-kings.com/haushaltshelden/graphql"'

const httpLink = createHttpLink({
  uri: url
});

const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    useErrorsStore().$state = {
      message: graphQLErrors[0].message,
      category: graphQLErrors[0].extensions.category,
      fields: graphQLErrors[0].extensions.validation ?? { input: {} },
    };

    

    const { logout } = useUserStore();
    logout();
  }
    
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("access-token"),
    },
  };
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(errorHandler.concat(httpLink)),
  cache,
});

export default apolloClient;