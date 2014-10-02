package com.kumarvv.sample.api;

/**
 * helper methods
 */
public class Utils {

	public static boolean isNumber(String str) {
		if (str == null || str.isEmpty()) {
			return false;
		}
		return str.matches("^[\\d]*$");
	}

}

