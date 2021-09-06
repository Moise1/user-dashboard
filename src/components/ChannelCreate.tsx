import React, { Component } from "react";
import Account from "./chanel/Account";
import AccountConnect from "./chanel/AccountConnect";
import ChooseList from "./chanel/ChooseList";
import PlatForm from "./chanel/PlatForm";
import StoreLocation from "./chanel/StoreLocation";
import UserName from "./chanel/UserName";

class ChannelCreate extends Component {
  state = {
    step: 1,
    platform: "",
    storeLocation: "",
    flag: "",
    location: "",
    api: "",
    extension: "",
    user: "",
    list: "",
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  handleChange = (input: any) => (e: any) => {
    this.setState({ [input]: e.target.value });
  };
  handleChangePlatform = (value: any) => {
    this.setState({ platform: value });
  };
  handleChangeLocation = (value: any) => {
    this.setState({ storeLocation: value });
  };
  handleChangeApi = (value: any) => {
    this.setState({ api: value });
  };
  handleChangeExtension = (value: any) => {
    this.setState({ extension: value });
  };
  handleChangeUser = (value: any) => {
    this.setState({ user: value });
  };
  handleChangeList = (value: any) => {
    this.setState({ list: value });
  };

  render() {
    const { step, platform, storeLocation, api, user, list, extension } =
      this.state;
    const values = { platform, storeLocation, api, user, list, extension };

    switch (step) {
      case 1:
        return (
          <PlatForm
            platform={this.state.platform}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
            handleChangePlatform={this.handleChangePlatform}
          />
        );
      case 2:
        return (
          <StoreLocation
            platform={this.state.platform}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            step={step}
            handleChangeLocation={this.handleChangeLocation}
          />
        );
      case 3:
        return (
          <Account
            platform={this.state.platform}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            // handleChangeApi={this.handleChangeApi}
            values={values}
            step={step}
          />
        );
      case 4:
        return (
          <AccountConnect
            api={this.state.api}
            extension={this.state.extension}
            platform={this.state.platform}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChangeApi={this.handleChangeApi}
            handleChangeExtension={this.handleChangeExtension}
            values={values}
            step={step}
          />
        );
      case 5:
        return (
          <UserName
            platform={this.state.platform}
            user={this.state.user}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChangeUser={this.handleChangeUser}
            values={values}
            step={step}
          />
        );
      case 6:
        return (
          <ChooseList
            platform={this.state.platform}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChangeList={this.handleChangeList}
            values={values}
            list={list}
            step={step}
          />
        );
      // never forget the default case, otherwise VS code would be mad!
      default:
      // do nothing
    }
  }
}

export default ChannelCreate;
