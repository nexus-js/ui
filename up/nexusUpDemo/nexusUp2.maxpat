{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 8
		}
,
		"rect" : [ 41.0, 53.0, 554.0, 587.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Avenir Medium",
		"gridonopen" : 0,
		"gridsize" : [ 10.0, 10.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-114",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 452.0, 361.0, 20.0, 140.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 393.0, 322.0, 20.0, 140.0 ],
					"varname" : "multislidernx807966"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-113",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 351.0, 131.0, 126.0, 139.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 368.0, 45.0, 159.0, 152.0 ],
					"setminmax" : [ 2.0, 10.0 ],
					"size" : 15,
					"varname" : "multislidernx773555"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"id" : "obj-112",
					"maxclass" : "number",
					"maximum" : 100,
					"minimum" : 20,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 194.0, 265.0, 50.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 267.0, 50.0, 23.0 ],
					"varname" : "numbernx3589575"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-106",
					"maxclass" : "dial",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 12.0, 271.0, 89.0, 89.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 150.0, 257.0, 77.0, 77.0 ],
					"varname" : "dialnx4477533"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"id" : "obj-99",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 134.0, 196.0, 92.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 143.0, 92.0, 21.0 ],
					"text" : "sendamessage!",
					"varname" : "messagenx8830286"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-96",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 50.0, 174.0, 45.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.0, 267.0, 92.0, 23.0 ],
					"text" : "check check",
					"varname" : "commentnx628315"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"maxclass" : "bpatcher",
					"name" : "nxUp.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 12.0, 384.0, 316.0, 135.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 384.0, 316.0, 135.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-110",
					"maxclass" : "slider",
					"min" : 100.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 272.0, 19.0, 55.0, 198.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 27.0, 55.0, 198.0 ],
					"size" : 200.0,
					"varname" : "slidernx4058360"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-109",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 341.0, 19.0, 96.0, 96.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 129.0, 96.0, 96.0 ],
					"varname" : "togglenx5918670"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-107",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 146.0, 19.0, 98.0, 98.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 19.0, 98.0, 98.0 ],
					"varname" : "buttonnx4436959"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-105",
					"maxclass" : "dial",
					"min" : 200.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 12.0, 25.0, 99.0, 99.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 257.0, 99.0, 99.0 ],
					"size" : 100.0,
					"varname" : "dialnx139013"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "nxUp.maxpat",
				"bootpath" : "/Library/WebServer/Documents/NexusUI/up/nexusUpDemo",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "nexusUp.js",
				"bootpath" : "/Library/WebServer/Documents/NexusUI/up/nexusUpDemo",
				"patcherrelativepath" : "",
				"type" : "TEXT",
				"implicit" : 1
			}
 ]
	}

}
