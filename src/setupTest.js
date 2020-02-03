/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { mergeConfig } from '@edx/frontend-platform';

configure({ adapter: new Adapter() });

process.env.LMS_BASE_URL = 'http://localhost:18000';

mergeConfig({
  LMS_BASE_URL: process.env.LMS_BASE_URL,
});
