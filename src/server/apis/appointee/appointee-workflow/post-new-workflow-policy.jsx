import ServerRequest from 'server/utils/server-request';
import { PostNewPolicyDetails_URL } from 'shared/constants/constants';
const postNewWorkflowPolicy = (payLoad) =>
  ServerRequest(PostNewPolicyDetails_URL, 'POST', payLoad);
export { postNewWorkflowPolicy };
