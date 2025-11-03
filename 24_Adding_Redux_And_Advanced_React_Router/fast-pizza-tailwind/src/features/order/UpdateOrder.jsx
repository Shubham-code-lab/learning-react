import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useFetcher } from 'react-router-dom';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    // Using fetcher.Form instead of regular Form to submit data WITHOUT navigation:
    // - Regular <Form>: Triggers navigation/revalidation and shows loading state (like changing pages)
    // - fetcher.Form: Submits data and revalidates the data in the background and stays on the current page
    // Perfect for updating data without disrupting the user's current view
    <fetcher.Form method="PATCH" className="text-right">
      <input type="hidden" name="priority" value="true" />
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
