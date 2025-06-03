import '@testing-library/jest-dom';

jest.mock('redux-persist/integration/react');
jest.mock('redux-persist-transform-encrypt');
jest.mock('redux-persist');
jest.mock('next/navigation');
jest.mock('react-beforeunload');