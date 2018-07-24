import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { UserValidators } from '../models/user-validator';
import { LoginService } from '../services/login.service';
import { ROUTE_PATHS } from '../../router/router-paths';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { UserModel } from "../../shared/models/user-model";
import { AppSettingsModel } from "../../shared/models/app-settings-model";
import { DBSettingsModel } from '../../shared/models/db-Settings-model';

@Component({
  selector: 'ispl-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public title: string = "Complaint Management System";
  public loginForm: FormGroup;
  public loginError: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.buildForm();
    //let s ="[{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"},{\"CMPLNT_REF_NO\":\"DI000012\",\"LAST_ACTIVITY_ID\":\"70\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"ACTIVITY_DESC\":\"PA\"}]";

    let s = "[{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"},{\"AUTO_ID\":\"10\",\"CMPLNT_REF_NO\":\"DI000012\",\"CMPLNT_REF_DATE\":\"18-Jul-2018 12:43:48 PM\",\"MODE_ID\":\"2\",\"CONTACT_PERSON_NAME\":\" \",\"CONTACT_PERSON_PHNO\":\" \",\"CONTACT_PERSON_EMAIL\":\" \",\"CMPLNT_LOGD_BY\":\"7527\",\"CMPLNT_LOGD_ON\":\"18-Jul-2018 12:43:48 PM\",\"NAT_CMPLNT_ID\":\"10\",\"CMPLNT_DETL\":\" \",\"FIN_ID\":\"1\",\"COMPANY_UNIT_ID\":\"TMLKHGP001\",\"INVOICE_NO\":\"\",\"SITE_VISIT_REQ\":\"N\",\"SITE_VISIT_DATE\":\"\",\"ACTION_RECOMEND\":\"\",\"ACTION_TYPE_PLNT\":\"\",\"ACTION_TAKEN_PLNT\":\"\",\"SITE_VISIT_BY\":\"\",\"CMPLNT_ACTION_TYPE\":\"\",\"MODE_REF_NO\":\"\",\"RPTD_CMPLNT\":\"\",\"PRE_CMPLNT_REF_NO\":\"\",\"RATING\":\"0\",\"CMPLNT_RCVD_BY_NAME\":\"\",\"CMPLNT_RCVD_BY_PH_NO\":\"\",\"DEPARMT_NAME_OTHER\":\"\",\"REG_REQ_COMM_SETLM\":\"\",\"VALID_CMPLNT\":\"\",\"LD_CMPLNT_REM\":\"\",\"CAP_REQ_COMM_SETLM\":\"\",\"CLO_ROOT_CSE_AGR\":\"\",\"CLO_ROOT_CSE_AGR_RN\":\"\",\"CLO_CAPA_AGR\":\"\",\"CLO_CAPA_AGR_RN\":\"\",\"CLO_REQ_COMM_SETLM\":\"\",\"CRD_NTE_NO\":\"\",\"CLOSE_REMARKS\":\"\",\"CLO_REQ_COMM_SET_RM\":\"\",\"CUST_CODE\":\"517\",\"CMPLNT_RECVD_BY_PI\":\"0\",\"SITE_VISIT_BY_DEPT_NAME\":\" \",\"ALLC_CMPNT_READ\":\" \",\"ACKNOLEDGEMENT_RCVD\":\" \",\"CLOSE_DATE\":\"\",\"PLANT_TYPE\":\"DI\",\"ACTIVITY_ID\":\"70\",\"RCA_ACTION\":\"\",\"RCA_ACTION_DT\":\"\",\"RCA_CANCEL_ACTION\":\"\",\"RCA_CANCEL_ACTION_DT\":\"\",\"CA_ACTION_CANCEL\":\"\",\"CA_ACTION_CANCEL_DT\":\"\",\"PA_ACTION\":\"\",\"PA_ACTION_DT\":\"\",\"PA_ACTION_CANCEL\":\"\",\"PA_ACTION_CANCEL_DT\":\"\",\"MAKER\":\"7527\",\"MAKER_DT_TM\":\"19-Jul-2018 12:43:49 PM\",\"CHECKER\":\"\",\"CHECKER_DT_TM\":\"\",\"CA_ACTION\":\"\",\"CA_ACTION_DT\":\"\",\"ACTIVITY_DESC\":\"PA\",\"MODE_DESC\":\"Written\",\"EMPLOYEE_NAME\":\"Swati Pal\",\"SITE_VISIT_BY_NAME\":\"\",\"DEPARTMENT_NAME\":\"N/A\",\"CMPLNT_TYPE_ID\":\"2\",\"CMPLNT_TYPE_DESC\":\"Jointing Related\",\"NAT_CMPLNT_DESC\":\"Ovality\",\"COMPANY_UNIT_NAME\":\"TML KGP\",\"CUSTOMER_CODE\":\"517\",\"CUSTOMER_NAME\":\"Ahmedabad Municipal Corporatio\",\"SALES_GROUP\":\"\",\"SALES_OFFICE\":\"West Sales Office\",\"CUSTOMER_SEGMENT\":\"GV_WSSB/PHED/PWD/IRG\",\"EMAIL_ID\":\" \"}]";
    // let testStr: string =  '[{"SLNO":"1","AUTO_ID":"1"},{"SLNO":"2","AUTO_ID":"2"}]';    
    let json : any = JSON.parse(s);
    console.log("json==== ",json);
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'username': [''
        , [
          Validators.required,
        ]
      ],
      'password': [''
        , [
          Validators.required,
        ]
      ]
    });

  }

  private loginSubmit(): void {
    console.log("login click");
    let user: any = {};

    user.userId = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    this.loginService.authenticate(user).
        subscribe(res => {
          console.log("Login Success Response: ",res);
          // this.setLoginDetailsToLocalstorageService(res);  
          if(res.msgType == "Info"){    
            this.setLoginDetailsToLocalstorageService(res);       
            this.router.navigate([ROUTE_PATHS.RouteHome]);               
          }else{
            this.loginError = res.msg;
            // "Netowrk/Server Problem";
          }
        },
        err => {
          if (err.status == 401) {
            this.loginError = "Invalid User Credentials";
          } else {
            this.loginError = "Netowrk/Server Problem";
          }
        });       
  }//end of method login service

  //new add to add login details in localstorage services
  public setLoginDetailsToLocalstorageService(resDetails: any){
    console.log("in setLoginDetailsToLocalstorageService method...");
    let userModel: UserModel  = new UserModel();
    userModel.accessToken = resDetails.accessToken;
    userModel.userId = this.loginForm.value.username;
    userModel.userDisplayName = resDetails.userDetails.employeeName;
    userModel.employeeId = resDetails.userDetails.employeeId;
    userModel.roleId = resDetails.userDetails.roleId;
    userModel.roleName = resDetails.userDetails.roleName;
    userModel.plantType = resDetails.userDetails.plantType; 
    userModel.plantTypeForBoth = resDetails.userDetails.plantType;                            
    this.localStorageService.user = userModel;

    let appSettingsModel: AppSettingsModel = new AppSettingsModel();
    appSettingsModel.authExpireInSec = resDetails.appSettingsDetails.authExpireInSec;
    appSettingsModel.companyId = resDetails.appSettingsDetails.companyId;
    appSettingsModel.diffBetwnCmplntRefDtAndLoggedOnDt = resDetails.appSettingsDetails.diffBetwnCmplntRefDtAndLoggedOnDt;
    appSettingsModel.loginUserPassMaxLength = resDetails.appSettingsDetails.loginUserPassMaxLength;
    appSettingsModel.loginUserPassMinLength = resDetails.appSettingsDetails.loginUserPassMinLength;
    appSettingsModel.rolePrefix = resDetails.appSettingsDetails.rolePrefix;
    appSettingsModel.areaSalesOrZonalManagerDesignationId = resDetails.appSettingsDetails.areaSalesOrZonalManagerDesignationId;
    appSettingsModel.complaintRegistrationActivityId = resDetails.appSettingsDetails.complaintRegistrationActivityId;
    appSettingsModel.preliminaryInvestigationActivityId = resDetails.appSettingsDetails.preliminaryInvestigationActivityId;
    appSettingsModel.pendingComplaintActivityId = resDetails.appSettingsDetails.pendingComplaintActivityId;
    appSettingsModel.closeComplaintActivityId = resDetails.appSettingsDetails.closeComplaintActivityId;
    appSettingsModel.resolutionOfComplaintsAtCustomerPlaceActivityId = resDetails.appSettingsDetails.resolutionOfComplaintsAtCustomerPlaceActivityId;
    appSettingsModel.analyseCustomerComplaintsAndActionPlanActivityId = resDetails.appSettingsDetails.analyseCustomerComplaintsAndActionPlanActivityId;
    appSettingsModel.activityIdFieldName = resDetails.appSettingsDetails.activityIdFieldName;
    appSettingsModel.menuDetails = resDetails.userDetails.menuDetails;
    //new add for field name
    appSettingsModel.validComplaintFieldName = resDetails.appSettingsDetails.validComplaintFieldName;
    appSettingsModel.complaintLoggedByFieldName = resDetails.appSettingsDetails.complaintLoggedByFieldName;
    appSettingsModel.complaintReceivedByOther = resDetails.appSettingsDetails.complaintReceivedByOther;
    appSettingsModel.siteVisitActivityId = resDetails.appSettingsDetails.siteVisitActivityId;
    appSettingsModel.defaultActivityId = resDetails.appSettingsDetails.defaultActivityId;   
    appSettingsModel.changeInQapOrwiOrisoProceedureActivityId = resDetails.appSettingsDetails.changeInQapOrwiOrisoProceedureActivityId;
    appSettingsModel.notificationInMilliSecond = resDetails.appSettingsDetails.notificationInMilliSecond;
    appSettingsModel.siteVisitByFieldName = resDetails.appSettingsDetails.siteVisitByFieldName;
    appSettingsModel.siteVisitRequiredFieldName = resDetails.appSettingsDetails.siteVisitRequiredFieldName;
    appSettingsModel.allocationOfComplaintReadFieldName = resDetails.appSettingsDetails.allocationOfComplaintReadFieldName;
    this.localStorageService.appSettings = appSettingsModel;
    
    //set the dbsettings details to dbsettings model
    let dbSettingsModel: DBSettingsModel = new DBSettingsModel();
   dbSettingsModel.actionRecomendedAfterSiteVisit = resDetails.dbSettingsDetails.actionRecomendedAfterSiteVisit;
   dbSettingsModel.actionTakenAtPlant = resDetails.dbSettingsDetails.actionTakenAtPlant;
   dbSettingsModel.actionTakenByASM = resDetails.dbSettingsDetails.actionTakenByASM;
   dbSettingsModel.batchNo = resDetails.dbSettingsDetails.batchNo;
   dbSettingsModel.capaAgreementReasonInClose = resDetails.dbSettingsDetails.capaAgreementReasonInClose;
   dbSettingsModel.closeRemarks = resDetails.dbSettingsDetails.closeRemarks;
   dbSettingsModel.complaintDescription = resDetails.dbSettingsDetails.complaintDescription;
   dbSettingsModel.complaintDetails = resDetails.dbSettingsDetails.complaintDetails;
   dbSettingsModel.complaintReceivedByName = resDetails.dbSettingsDetails.complaintReceivedByName;
   dbSettingsModel.complaintReceivedByPhoneNo = resDetails.dbSettingsDetails.complaintReceivedByPhoneNo;
   dbSettingsModel.complaintReferenceNo = resDetails.dbSettingsDetails.complaintReferenceNo;
   dbSettingsModel.contactPersonEmailId = resDetails.dbSettingsDetails.contactPersonEmailId;
   dbSettingsModel.contactPersonName = resDetails.dbSettingsDetails.contactPersonName;
   dbSettingsModel.contactPersonPhoneNo = resDetails.dbSettingsDetails.contactPersonPhoneNo;
   dbSettingsModel.creditNoteNo = resDetails.dbSettingsDetails.creditNoteNo;
   dbSettingsModel.departmentNameOther = resDetails.dbSettingsDetails.departmentNameOther;
   dbSettingsModel.employeeEmailId = resDetails.dbSettingsDetails.employeeEmailId;
   dbSettingsModel.employeeId = resDetails.dbSettingsDetails.employeeId;
   dbSettingsModel.employeeMobileNo = resDetails.dbSettingsDetails.employeeMobileNo;
   dbSettingsModel.employeeName = resDetails.dbSettingsDetails.employeeName;
   dbSettingsModel.expectationOfCustomer = resDetails.dbSettingsDetails.expectationOfCustomer;
   dbSettingsModel.ferulConnectionMethod = resDetails.dbSettingsDetails.ferulConnectionMethod;
   dbSettingsModel.inspectionMarking = resDetails.dbSettingsDetails.inspectionMarking;
   dbSettingsModel.invoiceNo = resDetails.dbSettingsDetails.invoiceNo;
   dbSettingsModel.isNew = resDetails.dbSettingsDetails.isNew;
   dbSettingsModel.marking = resDetails.dbSettingsDetails.marking;
   dbSettingsModel.modeReferenceNo = resDetails.dbSettingsDetails.modeReferenceNo;
   dbSettingsModel.observations = resDetails.dbSettingsDetails.observations;
   dbSettingsModel.outstandingWithCustomer = resDetails.dbSettingsDetails.outstandingWithCustomer;
   dbSettingsModel.ovality = resDetails.dbSettingsDetails.ovality;
   dbSettingsModel.password = resDetails.dbSettingsDetails.password;
   dbSettingsModel.pipeCuttingMethodApplied = resDetails.dbSettingsDetails.pipeCuttingMethodApplied;
   dbSettingsModel.pipeCuttingToolsUsed = resDetails.dbSettingsDetails.pipeCuttingToolsUsed;
   dbSettingsModel.pipeJointing = resDetails.dbSettingsDetails.pipeJointing;
   dbSettingsModel.presentStatus = resDetails.dbSettingsDetails.presentStatus;
   dbSettingsModel.previousComplaintReferenceNo = resDetails.dbSettingsDetails.previousComplaintReferenceNo;
   dbSettingsModel.requiredCommercialSettlementReasonInClose = resDetails.dbSettingsDetails.requiredCommercialSettlementReasonInClose;
   dbSettingsModel.resolutionRectificationAction = resDetails.dbSettingsDetails.resolutionRectificationAction;
   dbSettingsModel.roleName = resDetails.dbSettingsDetails.roleName;
   dbSettingsModel.rootCauseAnalysisAgreementReasonInClose = resDetails.dbSettingsDetails.rootCauseAnalysisAgreementReasonInClose;
   dbSettingsModel.rubberGasketBatchNo = resDetails.dbSettingsDetails.rubberGasketBatchNo;
   dbSettingsModel.rubberGasketBulb = resDetails.dbSettingsDetails.rubberGasketBulb;
   dbSettingsModel.rubberGasketHeal = resDetails.dbSettingsDetails.rubberGasketHeal;
   dbSettingsModel.rubberGasketMake = resDetails.dbSettingsDetails.rubberGasketMake;
   dbSettingsModel.rubberGasketTestCertificate = resDetails.dbSettingsDetails.rubberGasketTestCertificate;
   dbSettingsModel.securityAnswer = resDetails.dbSettingsDetails.securityAnswer;
   dbSettingsModel.straigtness = resDetails.dbSettingsDetails.straigtness;
   dbSettingsModel.testCertificate = resDetails.dbSettingsDetails.testCertificate;
   dbSettingsModel.thicknessWall = resDetails.dbSettingsDetails.thicknessWall;
   dbSettingsModel.unloadingRelatedMethodApplied = resDetails.dbSettingsDetails.unloadingRelatedMethodApplied;
   dbSettingsModel.unloadingRelatedToolsUsed = resDetails.dbSettingsDetails.unloadingRelatedToolsUsed;
   dbSettingsModel.userId = resDetails.dbSettingsDetails.userId;
   dbSettingsModel.validInvalidComplaintRemarks = resDetails.dbSettingsDetails.validInvalidComplaintRemarks;
   dbSettingsModel.batchNoInInvoiceDetails = resDetails.dbSettingsDetails.batchNoInInvoiceDetails;
         
   this.localStorageService.dbSettings = dbSettingsModel;
    
  }

}//end of class
