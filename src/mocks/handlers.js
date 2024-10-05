import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";

const defaultData = [
  {
    name: "Create user",
    id: uuidv4(),
    status: 1,
  },
  {
    name: "Update user",
    id: uuidv4(),
    status: 0,
  },
  {
    name: "Delete user",
    id: uuidv4(),
    status: 1,
  },
];

export const handlers = [
  http.get("/api/todos", (resolver) => {
    const data = localStorage.getItem("mock-data");

    const url = resolver.request.url;
    const params = new URLSearchParams(new URL(url).search);
    const status = params.get("status");

    try {
      const parseData = JSON.parse(data);
      if (!parseData && typeof parseData !== "array") {
        localStorage.setItem("mock-data", JSON.stringify(defaultData));
        const dataFilter = defaultData?.filter(
          (item) => item?.status === Number(status)
        );

        return HttpResponse.json(dataFilter);
      }

      if (status && Number(status) !== 2) {
        const dataFilter = parseData?.filter(
          (item) => item?.status === Number(status)
        );

        return HttpResponse.json(dataFilter);
      }

      console.log("status", status);

      return HttpResponse.json(parseData);
    } catch (error) {
      console.log("error", error);
      return HttpResponse.json([]);
    }
  }),
  http.post("/api/todo", async ({ request }) => {
    const dataDefault = localStorage.getItem("mock-data");

    const requestBody = await request.json();

    const response = {
      ...requestBody,
      createdAt: new Date().toLocaleString(),
      id: uuidv4(),
    };

    try {
      const currData = JSON.parse(dataDefault);

      if (currData?.length > 0) {
        localStorage.setItem(
          "mock-data",
          JSON.stringify([response, ...currData])
        );
      } else {
        localStorage.setItem("mock-data", JSON.stringify([response]));
      }
    } catch (error) {}
    return HttpResponse.json(response, { status: 201 });
  }),
  http.patch("/api/todo/:id", async ({ request, params }) => {
    const dataDefault = localStorage.getItem("mock-data");

    try {
      const currData = JSON.parse(dataDefault);
      const { id } = params;

      if (!currData || !id) {
        return HttpResponse.json(
          { message: "Fail to update!" },
          { status: 400 }
        );
      }

      const findItem = currData?.find((item) => item?.id === id);

      if (!findItem)
        return HttpResponse.json(
          { message: "Task not found!" },
          { status: 400 }
        );
      const requestBody = await request.json();
      const dataUpdate = { ...findItem, ...requestBody };

      const listUpdated = currData?.map((item) => {
        if (item?.id === id) {
          return dataUpdate;
        }
        return item;
      });

      localStorage.setItem("mock-data", JSON.stringify(listUpdated));
      return HttpResponse.json(dataUpdate, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ message: "Fail to update!" }, { status: 400 });
    }
  }),
  http.delete("/api/todo/:id", async ({ request, params }) => {
    const dataDefault = localStorage.getItem("mock-data");

    try {
      const currData = JSON.parse(dataDefault);
      const { id } = params;

      if (!currData || !id) {
        return HttpResponse.json(
          { message: "Fail to delete!" },
          { status: 400 }
        );
      }

      const findItem = currData?.find((item) => item?.id === id);

      if (!findItem)
        return HttpResponse.json(
          { message: "Task not found!" },
          { status: 400 }
        );

      const listUpdated = currData?.filter((item) => item?.id !== id);

      localStorage.setItem("mock-data", JSON.stringify(listUpdated));
      return HttpResponse.json({ message: "Delete success!" }, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ message: "Fail to update!" }, { status: 400 });
    }
  }),
];
