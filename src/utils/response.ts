export const successResponse = (
  res: any,
  data: any,
  message = "Success"
) => {
  res.json({ success: true, message, data });
};
