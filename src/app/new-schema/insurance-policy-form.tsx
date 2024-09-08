"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

export function InsurancePolicyForm() {
  const [formData, setFormData] = useState({
    policyHolderName: "",
    policyHolderID: "",
    dateOfBirth: "",
    policyNumber: "",
    policyType: "",
    policyStartDate: "",
    policyEndDate: "",
    beneficiaryName: "",
    beneficiaryID: "",
    coverageAmount: "",
    premiumAmount: "",
    paymentFrequency: "",
    claimID: "",
    claimDate: "",
    claimStatus: "",
    attestationDate: "",
    verifiedBy: "",
    digitalSignature: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: format(date, "yyyy-MM-dd"),
    }));
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-schema",
        {
          name: "test_after",
          data: [
            { name: "policyHolderName", type: "string" },
            { name: "policyHolderID", type: "string" },
            { name: "dateOfBirth", type: "string" },
            { name: "policyNumber", type: "string" },
            { name: "policyType", type: "string" },
            { name: "policyStartDate", type: "string" },
            { name: "policyEndDate", type: "string" },
            { name: "beneficiaryName", type: "string" },
            { name: "beneficiaryID", type: "string" },
            { name: "coverageAmount", type: "number" },
            { name: "premiumAmount", type: "number" },
            { name: "paymentFrequency", type: "string" },
            { name: "claimID", type: "string" },
            { name: "claimDate", type: "string" },
            { name: "claimStatus", type: "string" },
            { name: "attestationDate", type: "string" },
            { name: "verifiedBy", type: "string" },
            { name: "digitalSignature", type: "string" },
          ],
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Insurance Policy Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="policyHolderName">Policy Holder Name</Label>
            <Input
              id="policyHolderName"
              name="policyHolderName"
              value={formData.policyHolderName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyHolderID">Policy Holder ID</Label>
            <Input
              id="policyHolderID"
              name="policyHolderID"
              value={formData.policyHolderID}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {formData.dateOfBirth ? (
                    format(new Date(formData.dateOfBirth), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                      : undefined
                  }
                  onSelect={(date) => handleDateChange(date, "dateOfBirth")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyNumber">Policy Number</Label>
            <Input
              id="policyNumber"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyType">Policy Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "policyType")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select policy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term life">Term Life</SelectItem>
                <SelectItem value="whole life">Whole Life</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyStartDate">Policy Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {formData.policyStartDate ? (
                    format(new Date(formData.policyStartDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.policyStartDate
                      ? new Date(formData.policyStartDate)
                      : undefined
                  }
                  onSelect={(date) => handleDateChange(date, "policyStartDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyEndDate">Policy End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {formData.policyEndDate ? (
                    format(new Date(formData.policyEndDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.policyEndDate
                      ? new Date(formData.policyEndDate)
                      : undefined
                  }
                  onSelect={(date) => handleDateChange(date, "policyEndDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
            <Input
              id="beneficiaryName"
              name="beneficiaryName"
              value={formData.beneficiaryName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beneficiaryID">Beneficiary ID</Label>
            <Input
              id="beneficiaryID"
              name="beneficiaryID"
              value={formData.beneficiaryID}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverageAmount">Coverage Amount</Label>
            <Input
              id="coverageAmount"
              name="coverageAmount"
              type="number"
              value={formData.coverageAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="premiumAmount">Premium Amount</Label>
            <Input
              id="premiumAmount"
              name="premiumAmount"
              type="number"
              value={formData.premiumAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentFrequency">Payment Frequency</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange(value, "paymentFrequency")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimID">Claim ID (Optional)</Label>
            <Input
              id="claimID"
              name="claimID"
              value={formData.claimID}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimDate">Claim Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {formData.claimDate ? (
                    format(new Date(formData.claimDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.claimDate
                      ? new Date(formData.claimDate)
                      : undefined
                  }
                  onSelect={(date) => handleDateChange(date, "claimDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimStatus">Claim Status (Optional)</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange(value, "claimStatus")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="attestationDate">Attestation Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {formData.attestationDate ? (
                    format(new Date(formData.attestationDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.attestationDate
                      ? new Date(formData.attestationDate)
                      : undefined
                  }
                  onSelect={(date) => handleDateChange(date, "attestationDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="verifiedBy">Verified By</Label>
            <Input
              id="verifiedBy"
              name="verifiedBy"
              value={formData.verifiedBy}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="digitalSignature">Digital Signature</Label>
            <Input
              id="digitalSignature"
              name="digitalSignature"
              value={formData.digitalSignature}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Create Schema
        </Button>
      </CardFooter>
    </Card>
  );
}
