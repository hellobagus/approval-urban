import axios from 'axios';
import httpClient from './HttpClient';

class MenuController {
  constructor() {
    this.basePath = '/c_menu';
    this.appPath = '/c_approval';
  }

  getMenu = async (userId) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/groupMenu`,
        method: "POST",
        data : {
          approval_user : userId
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getDetail = async (app_user,approval_id) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/viewMenu`,
        method: "POST",
        data : {
          approval_user : app_user,
          approval_id : approval_id
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getOtorisasi = async (entity,docNo) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/otorisasi`,
        method: "POST",
        data : {
          entity_cd : entity,
          doc_no : docNo
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  setApprove = async (status,data) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/updateApproval/${status}`,
        method: "POST",
        data : {
          entity_cd : data.entity_cd,
          doc_no : data.doc_no,
          status,
          remarks : data.reason_remarks
        }
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

export default new MenuController();
