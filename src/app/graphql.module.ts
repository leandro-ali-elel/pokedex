import {NgModule} from '@angular/core';
import {InMemoryCache} from '@apollo/client/core';
import {ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {environment} from 'src/environments/environment';

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,

      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          pokemon: {
            link: httpLink.create({uri: environment.pokeAPIURL}),
            cache: new InMemoryCache({addTypename: false}),
          },
          jokes: {
            link: httpLink.create({uri: environment.dadJokesAPI}),
            cache: new InMemoryCache({resultCaching: false, addTypename: false}),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
