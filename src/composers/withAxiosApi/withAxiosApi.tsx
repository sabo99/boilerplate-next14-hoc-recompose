// import React from "react";
// import { Options } from "./withAxiosApi.type"

// const withAxiosApi = (axiosApiOptions: Options) => (ComposedComponent: React.ComponentType<any>) => {
//   const {
//     url,
//     method = "GET",
//     props: mapProps,
//     options = () => ({}),
//     skipQueryOnRender = false
//   } = axiosApiOptions;

//   class WithAxios extends React.PureComponent {
//     constructor(props: any) {
//       super(props);
//       this._isFetching = false;
//       this.state = {
//         result: this._mapDataProps()
//       };
//     }

//     componentDidMount(): void {
//       if (!skipQueryOnRender) {
//         this._fetchData();
//       }
//     }

//     _mapDataProps = (state = {}) => {
//       const { loading = true, error = null, ...data } = state;
//       return mapProps({
//         refetch: this._fetchData(),
//         loading,
//         error,
//         ...data
//       });
//     };

//     _fetchData = async () => {
//       this.setState({
//         result: this._mapDataProps()
//       });
//     };

//     _axiosGet = async () => {
//       if (this._isFetching) {

//       }
//     }

//     _postData = async (payload: any) => {
//       this.setState({
//         result: this._mapDataProps()
//       });
//     };

//     // const response = await this.
//   }
// };