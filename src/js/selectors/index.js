import { createSelector } from 'reselect'

// Because we cannot dynamically import modules from strings, we need to,
// unfortunately, import them specifically here and define their associated
// filter clause.

import TestListContainer from '../containers/TestListContainer' // eslint-disable-line no-unused-vars
import SettingsFormContainer from '../containers/SettingsFormContainer' // eslint-disable-line no-unused-vars
import PublisherTestContainer from '../containers/test/PublisherTestContainer' // eslint-disable-line no-unused-vars
import SubscriberTestContainer from '../containers/test/SubscriberTestContainer' // eslint-disable-line no-unused-vars

const getViewFilter = (state) => state.viewFilter

export const getCurrentPage = createSelector(
  [getViewFilter],
  (viewFilter) => {
    switch(viewFilter.toLowerCase()) {
      case 'settings':
      case 'home':
        return <SettingsFormContainer />
      case 'publish':
        return <PublisherTestContainer />
      case 'subscribe':
        return <SubscriberTestContainer />
      default:
        return <TestListContainer />
    }
  }
)

