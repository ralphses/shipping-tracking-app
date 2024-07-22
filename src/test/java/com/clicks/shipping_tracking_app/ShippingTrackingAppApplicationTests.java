package com.clicks.shipping_tracking_app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

class ShippingTrackingAppApplicationTests {

	@Test
	void writeDocumentationSnippets() {

		var modules = ApplicationModules.of(ShippingTrackingAppApplication.class).verify();

		new Documenter(modules)
				.writeModulesAsPlantUml()
				.writeIndividualModulesAsPlantUml();
	}

}
