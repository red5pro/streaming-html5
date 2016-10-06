import { createSelector } from 'reselect'

// Because we cannot dynamically import modules from strings, we need to,
// unfortunately, import them specifically here and define their associated
// filter clause.

import TestListContainer from '../containers/TestListContainer' // eslint-disable-line no-unused-vars
import SettingsFormContainer from '../containers/SettingsFormContainer' // eslint-disable-line no-unused-vars

import TestContainer from '../containers/test/TestContainer'
import * as tests from '../components/test'

const getViewFilter = (state) => state.viewFilter

export const getCurrentPage = createSelector(
  [getViewFilter],
  (viewFilter) => {
    switch(viewFilter.toLowerCase()) {
      case 'publish':
        return TestContainer(tests.PublisherTest)
      case 'subscribe':
        return TestContainer(tests.SubscriberTest)
      case 'publish - 1080p':
        return TestContainer(tests.Publisher1080pTest)
      case 'publish - failover':
        return TestContainer(tests.PublisherFailoverTest)
      case 'subscribe - failover':
        return TestContainer(tests.SubscriberFailoverTest)
      case 'publish - audio mode':
        return TestContainer(tests.PublisherAudioOnlyTest)
      case 'publish - camera source':
        return TestContainer(tests.PublisherCameraSourceTest)
      case 'publish - camera swap':
        return TestContainer(tests.PublisherCameraSwapTest)
      case 'publish - filters':
        return TestContainer(tests.PublisherFiltersTest)
      case 'publish - image capture':
        return TestContainer(tests.PublisherImageCaptureTest)
      case 'publish - stream manager':
        return TestContainer(tests.PublisherStreamManagerTest)
      case 'settings':
      case 'home':
        return <SettingsFormContainer />
      default:
        return <TestListContainer />
    }
  }
)

